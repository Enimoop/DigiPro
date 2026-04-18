"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import (
    complete_onboarding, csrf, login_view, refresh_view, logout_view, me, register_view,
    get_user_progress, theme_progress_detail
)
from api.views_modules import modules_list

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/csrf/", csrf),
    path("api/auth/login/", login_view),
    path("api/auth/refresh/", refresh_view),
    path("api/auth/logout/", logout_view),
    path("api/auth/register/", register_view),

    path("api/me/", me),

    # modules
    path("api/modules/", modules_list),

    path("api/onboarding/complete/", complete_onboarding, name="complete_onboarding"),

    # progress
    path("api/progress/", get_user_progress, name="get_user_progress"),
    path("api/progress/<int:theme_id>/", theme_progress_detail, name="theme_progress_detail"),
]
