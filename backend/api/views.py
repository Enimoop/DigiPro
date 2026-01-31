from django.contrib.auth import authenticate, get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

COOKIE_SECURE = False 
COOKIE_SAMESITE = "Lax" 


# -------------------------------------------------
# CSRF helper: pose le cookie csrftoken
# -------------------------------------------------
@api_view(["GET"])
@permission_classes([AllowAny])
@authentication_classes([])
@ensure_csrf_cookie
def csrf(request):
    return Response({"detail": "CSRF cookie set"})


# -------------------------------------------------
# REGISTER (optionnel mais utile si tu veux signup côté front)
# -------------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    username = (request.data.get("username") or "").strip()  # optionnel, mais on peut le garder
    email = (request.data.get("email") or "").strip().lower()
    password = request.data.get("password") or ""

    if not email:
        return Response({"email": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email__iexact=email).exists():
        return Response({"email": ["This email is already used."]}, status=status.HTTP_400_BAD_REQUEST)

    if not username:
        # fallback simple: username = partie avant @ (avec suffixe si conflit)
        base = email.split("@")[0] or "user"
        candidate = base
        i = 1
        while User.objects.filter(username=candidate).exists():
            i += 1
            candidate = f"{base}{i}"
        username = candidate

    if len(password) < 8:
        return Response({"password": ["Minimum 8 characters."]}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"id": user.id, "username": user.username, "email": user.email}, status=status.HTTP_201_CREATED)



# -------------------------------------------------
# LOGIN -> pose access_token + refresh_token en cookies httpOnly
# -------------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = (request.data.get("email") or "").strip().lower()
    password = request.data.get("password") or ""

    if not email or not password:
        return Response({"detail": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    if not user.check_password(password):
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    res = Response({"detail": "Logged in"}, status=status.HTTP_200_OK)
    res.set_cookie("access_token", access, httponly=True, secure=COOKIE_SECURE, samesite=COOKIE_SAMESITE, path="/")
    res.set_cookie("refresh_token", str(refresh), httponly=True, secure=COOKIE_SECURE, samesite=COOKIE_SAMESITE, path="/api/auth/refresh/")
    return res

# -------------------------------------------------
# REFRESH -> lit refresh_token cookie, renouvelle access_token cookie
# -------------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def refresh_view(request):
    refresh_token = request.COOKIES.get("refresh_token")
    if not refresh_token:
        return Response({"detail": "No refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        refresh = RefreshToken(refresh_token)
        access = str(refresh.access_token)
    except Exception:
        return Response({"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

    res = Response({"detail": "refreshed"}, status=status.HTTP_200_OK)
    res.set_cookie(
        "access_token",
        access,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        path="/",
    )
    return res


# -------------------------------------------------
# LOGOUT -> supprime les cookies
# -------------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def logout_view(request):
    res = Response({"detail": "Logged out"}, status=status.HTTP_200_OK)
    res.delete_cookie("access_token", path="/")
    res.delete_cookie("refresh_token", path="/api/auth/refresh/")
    return res


# -------------------------------------------------
# ME -> endpoint protégé : renvoie l'utilisateur connecté
# -------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    u = request.user
    return Response({
        "id": u.id,
        "username": u.username,
        "email": u.email,
        "is_staff": u.is_staff,
    })
