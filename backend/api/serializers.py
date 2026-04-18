from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Module, Theme, UserThemeProgress

# -----------------------------
# AUTH
# -----------------------------

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("username", "email", "password", "has_seen_onboarding" )

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )

# -----------------------------
# MODULES / THEMES
# -----------------------------

class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ["id", "slug", "title", "description", "enabled", "order"]


class ModuleSerializer(serializers.ModelSerializer):
    themes = ThemeSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ["slug", "title", "description", "icon", "enabled", "order", "themes"]


# -----------------------------
# PROGRESS
# -----------------------------

class UserThemeProgressSerializer(serializers.ModelSerializer):
    theme_slug = serializers.CharField(source="theme.slug", read_only=True)
    theme_title = serializers.CharField(source="theme.title", read_only=True)
    module_slug = serializers.CharField(source="theme.module.slug", read_only=True)

    class Meta:
        model = UserThemeProgress
        fields = ["id", "theme", "theme_slug", "theme_title", "module_slug", "completed", "progress_pct", "started_at", "updated_at"]
        read_only_fields = ["id", "started_at", "updated_at"]