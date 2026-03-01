from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Module, Theme

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
        fields = ["slug", "title", "description", "enabled", "order"]


class ModuleSerializer(serializers.ModelSerializer):
    themes = ThemeSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ["slug", "title", "description", "icon", "enabled", "order", "themes"]