from django.db.models import Prefetch
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Module, Theme
from .serializers import ModuleSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
@authentication_classes([])
def modules_list(request):
    themes_qs = Theme.objects.filter(enabled=True).order_by("order")

    qs = (
        Module.objects
        .filter(enabled=True)
        .prefetch_related(Prefetch("themes", queryset=themes_qs))
        .order_by("order")
    )

    return Response(ModuleSerializer(qs, many=True).data)