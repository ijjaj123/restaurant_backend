from rest_framework import serializers
from .models import RestaurantInfo, MenuItem, Feedback, Reservation

class RestaurantInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantInfo
        fields = '__all__'

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'description', 'price', 'image', 'is_active']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'name', 'email', 'comment', 'created_at']
        read_only_fields = ['created_at']

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'name', 'email', 'phone', 'date', 'time', 'party_size', 'created_at']
        read_only_fields = ['created_at']
