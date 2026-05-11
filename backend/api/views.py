from django.contrib.auth import get_user_model, update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import IntegrityError, connection, transaction
from django.utils.html import strip_tags
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Theme, UserThemeProgress
from .serializers import UserThemeProgressSerializer

User = get_user_model()

COOKIE_SECURE = False
COOKIE_SAMESITE = "Lax"
REGISTER_EMAIL_ERROR = "Impossible de creer un compte avec cet email."


def has_html_like_content(value: str) -> bool:
    return value != strip_tags(value) or "<" in value or ">" in value


def lock_email_address(email: str) -> None:
    if connection.vendor != "postgresql" or not email:
        return

    # Prevent concurrent requests from creating two accounts for the same email.
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT pg_advisory_xact_lock(hashtext(%s)::bigint)",
            [email],
        )


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
    username = (
        request.data.get("username") or ""
    ).strip()  # optionnel, mais on peut le garder
    email = (request.data.get("email") or "").strip().lower()
    password = request.data.get("password") or ""
    confirm_password_input = request.data.get("confirm_password")
    password_confirm_input = request.data.get("password_confirm")

    if confirm_password_input is None and password_confirm_input is None:
        return Response(
            {"confirm_password": ["This field is required."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if (
        confirm_password_input is not None
        and password_confirm_input is not None
        and confirm_password_input != password_confirm_input
    ):
        return Response(
            {"confirm_password": ["Les mots de passe ne correspondent pas."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    confirm_password = (
        confirm_password_input
        if confirm_password_input is not None
        else password_confirm_input
    ) or ""

    if has_html_like_content(email):
        return Response(
            {"email": ["L'email ne doit pas contenir de balises HTML."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if has_html_like_content(password):
        return Response(
            {"password": ["Le mot de passe ne doit pas contenir de balises HTML."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if has_html_like_content(confirm_password):
        return Response(
            {"confirm_password": ["Le mot de passe de confirmation ne doit pas contenir de balises HTML."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if has_html_like_content(username):
        return Response(
            {"username": ["Le nom d'utilisateur ne doit pas contenir de balises HTML."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not email:
        return Response(
            {"email": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        validate_email(email)
    except ValidationError:
        return Response(
            {"email": ["Veuillez saisir une adresse email valide."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not username:
        # fallback simple: username = partie avant @ (avec suffixe si conflit)
        base = email.split("@")[0] or "user"
        candidate = base
        i = 1
        while User.objects.filter(username=candidate).exists():
            i += 1
            candidate = f"{base}{i}"
        username = candidate

    if password != confirm_password:
        return Response(
            {"confirm_password": ["Les mots de passe ne correspondent pas."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # Reuse Django's standard password policy at signup as well.
        validate_password(password, user=User(username=username, email=email))
    except ValidationError as exc:
        return Response(
            {"password": list(exc.messages)},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        with transaction.atomic():
            lock_email_address(email)

            if User.objects.filter(email__iexact=email).exists():
                return Response(
                    {"email": [REGISTER_EMAIL_ERROR]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.create_user(username=username, email=email, password=password)
    except IntegrityError:
        return Response(
            {"email": [REGISTER_EMAIL_ERROR]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {"id": user.id, "username": user.username, "email": user.email},
        status=status.HTTP_201_CREATED,
    )


# -------------------------------------------------
# LOGIN -> pose access_token + refresh_token en cookies httpOnly
# -------------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = (request.data.get("email") or "").strip().lower()
    password = request.data.get("password") or ""

    if has_html_like_content(email) or has_html_like_content(password):
        return Response(
            {"detail": "Les identifiants ne doivent pas contenir de balises HTML."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not email or not password:
        return Response(
            {"detail": "Email and password required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(email__iexact=email)
    except User.MultipleObjectsReturned:
        return Response(
            {"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )
    except User.DoesNotExist:
        return Response(
            {"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )

    if not user.check_password(password):
        return Response(
            {"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )

    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    res = Response({"detail": "Logged in"}, status=status.HTTP_200_OK)
    res.set_cookie(
        "access_token",
        access,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        path="/",
    )
    res.set_cookie(
        "refresh_token",
        str(refresh),
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        path="/api/auth/refresh/",
    )
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
        return Response(
            {"detail": "No refresh token"}, status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})
        serializer.is_valid(raise_exception=True)
        access = serializer.validated_data["access"]
        new_refresh = serializer.validated_data.get("refresh")
    except (InvalidToken, TokenError):
        return Response(
            {"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED
        )

    res = Response({"detail": "refreshed"}, status=status.HTTP_200_OK)
    res.set_cookie(
        "access_token",
        access,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        path="/",
    )

    if new_refresh:
        res.set_cookie(
            "refresh_token",
            new_refresh,
            httponly=True,
            secure=COOKIE_SECURE,
            samesite=COOKIE_SAMESITE,
            path="/api/auth/refresh/",
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
    return Response(
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "is_staff": u.is_staff,
            "has_seen_onboarding": getattr(u, "profile", None)
            and u.profile.has_seen_onboarding,
        }
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_account(request):
    request.user.delete()

    res = Response({"detail": "Account deleted."}, status=status.HTTP_200_OK)
    res.delete_cookie("access_token", path="/")
    res.delete_cookie("refresh_token", path="/api/auth/refresh/")
    return res


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def complete_onboarding(request):
    profile = request.user.profile
    profile.has_seen_onboarding = True
    profile.onboarding_step = 0
    profile.save(update_fields=["has_seen_onboarding", "onboarding_step"])
    return Response({"ok": True, "has_seen_onboarding": True})


# -------------------------------------------------
# PROGRESS ENDPOINTS
# -------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_progress(request):
    """Get all progress for the authenticated user"""
    progress = UserThemeProgress.objects.filter(user=request.user).select_related(
        "theme", "theme__module"
    )
    serializer = UserThemeProgressSerializer(progress, many=True)
    return Response(serializer.data)


@api_view(["GET", "POST", "PUT"])
@permission_classes([IsAuthenticated])
def theme_progress_detail(request, theme_id):
    """
    GET: Get progress for a specific theme
    POST/PUT: Create or update progress for a specific theme
    """
    try:
        theme = Theme.objects.get(id=theme_id)
    except Theme.DoesNotExist:
        return Response({"detail": "Theme not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        try:
            progress = UserThemeProgress.objects.get(user=request.user, theme=theme)
            serializer = UserThemeProgressSerializer(progress)
            return Response(serializer.data)
        except UserThemeProgress.DoesNotExist:
            return Response(
                {"detail": "No progress yet for this theme"},
                status=status.HTTP_404_NOT_FOUND,
            )

    elif request.method in ["POST", "PUT"]:
        # Create or update progress
        progress, created = UserThemeProgress.objects.get_or_create(
            user=request.user,
            theme=theme,
        )

        # Update fields from request data
        data = request.data
        if "completed" in data:
            progress.completed = data["completed"]
        if "progress_pct" in data:
            # Ensure progress_pct is between 0 and 100
            pct = int(data["progress_pct"])
            progress.progress_pct = max(0, min(100, pct))

        progress.save()
        serializer = UserThemeProgressSerializer(progress)
        http_status = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(serializer.data, status=http_status)


# -------------------------------------------------
# PROFILE UPDATE ENDPOINTS
# -------------------------------------------------
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_profile_info(request):
    user = request.user

    first_name = (request.data.get("first_name") or "").strip()
    last_name = (request.data.get("last_name") or "").strip()
    email = (request.data.get("email") or "").strip().lower()

    if not email:
        return Response({"email": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)

    if first_name != strip_tags(first_name) or "<" in first_name or ">" in first_name:
        return Response(
            {"first_name": ["Le prénom ne doit pas contenir de balises HTML."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if last_name != strip_tags(last_name) or "<" in last_name or ">" in last_name:
        return Response(
            {"last_name": ["Le nom ne doit pas contenir de balises HTML."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if email != strip_tags(email) or "<" in email or ">" in email:
        return Response(
            {"email": ["L'email ne doit pas contenir de balises HTML."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        validate_email(email)
    except ValidationError:
        return Response(
            {"email": ["Veuillez saisir une adresse email valide."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        with transaction.atomic():
            lock_email_address(email)

            email_in_use = (
                User.objects.filter(email__iexact=email)
                .exclude(pk=user.pk)
                .exists()
            )
            if email_in_use:
                return Response({"email": ["This email is already used."]}, status=status.HTTP_400_BAD_REQUEST)

            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.save(update_fields=["first_name", "last_name", "email"])
    except IntegrityError:
        return Response({"email": ["This email is already used."]}, status=status.HTTP_400_BAD_REQUEST)

    return Response(
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_staff": user.is_staff,
            "has_seen_onboarding": getattr(user, "profile", None)
            and user.profile.has_seen_onboarding,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get("current_password") or ""
    new_password = request.data.get("new_password") or ""
    confirm_password = request.data.get("confirm_password") or ""

    if (
        has_html_like_content(current_password)
        or has_html_like_content(new_password)
        or has_html_like_content(confirm_password)
    ):
        return Response(
            {"detail": "Les champs mot de passe ne doivent pas contenir de balises HTML."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not user.check_password(current_password):
        return Response(
            {"current_password": ["Le mot de passe actuel est incorrect."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not new_password:
        return Response(
            {"new_password": ["Ce champ est requis."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if new_password != confirm_password:
        return Response(
            {"confirm_password": ["Les mots de passe ne correspondent pas."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        validate_password(new_password, user=user)
    except ValidationError as exc:
        return Response({"new_password": list(exc.messages)}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save(update_fields=["password"])
    update_session_auth_hash(request, user)

    return Response({"detail": "Password updated."}, status=status.HTTP_200_OK)
