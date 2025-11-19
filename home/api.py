from rest_framework import viewsets, permissions
from .models import RestaurantInfo, MenuItem, Feedback, Reservation
from .serializers import (
    RestaurantInfoSerializer, MenuItemSerializer, FeedbackSerializer, ReservationSerializer
)

class RestaurantInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RestaurantInfo.objects.all()
    serializer_class = RestaurantInfoSerializer
    permission_classes = [permissions.AllowAny]

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.filter(is_active=True)
    serializer_class = MenuItemSerializer
    permission_classes = [permissions.AllowAny]

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all().order_by('-created_at')
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.AllowAny]

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all().order_by('-created_at')
    serializer_class = ReservationSerializer
    permission_classes = [permissions.AllowAny]
