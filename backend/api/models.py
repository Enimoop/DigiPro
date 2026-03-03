from django.conf import settings
from django.db import models


class Module(models.Model):
    slug = models.SlugField(max_length=64, unique=True)  # ex: "cybersecurite"
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    icon = models.CharField(max_length=64, blank=True, default="")  # ex: "lock"
    enabled = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class Theme(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="themes")
    slug = models.SlugField(max_length=64)  # ex: "passwords"
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    enabled = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(fields=["module", "slug"], name="uniq_theme_slug_per_module")
        ]

    def __str__(self):
        return self.title


class UserThemeProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="theme_progress")
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE, related_name="user_progress")
    completed = models.BooleanField(default=False)
    progress_pct = models.PositiveSmallIntegerField(default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "theme")
        ordering = ["started_at"]

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    has_seen_onboarding = models.BooleanField(default=False)
    onboarding_step = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Profile({self.user})"