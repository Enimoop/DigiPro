from django.conf import settings
from django.db import models


class Theme(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class Module(models.Model):
    theme = models.ForeignKey(
        Theme,
        on_delete=models.CASCADE,
        related_name="modules",
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class UserThemeProgress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="theme_progress",
    )
    theme = models.ForeignKey(
        Theme,
        on_delete=models.CASCADE,
        related_name="user_progress",
    )
    completed = models.BooleanField(default=False)
    progress_pct = models.PositiveSmallIntegerField(default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "theme")
        ordering = ["started_at"]

    def __str__(self):
        return f"{self.user} - {self.theme} ({self.progress_pct}%)"
