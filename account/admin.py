from django.contrib import admin
from .models import UserProfile  # <-- change Profile to UserProfile

@admin.register(UserProfile)     # <-- also change here
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone')
