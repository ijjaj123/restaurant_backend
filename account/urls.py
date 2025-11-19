from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterAPI, ProfileAPI
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Simple endpoints (register/profile)
urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('profile/', ProfileAPI.as_view(), name='profile'),
    # JWT token endpoints:
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
