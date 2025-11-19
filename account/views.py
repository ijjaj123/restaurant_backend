from rest_framework import generics, permissions
from .serializers import RegisterSerializer, ProfileSerializer
from django.contrib.auth import get_user_model
from .models import UserProfile  # <-- corrected

User = get_user_model()

class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileAPI(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)  # <-- corrected
        return profile
