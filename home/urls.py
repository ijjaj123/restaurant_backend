from django.urls import path
from .views import homepage, menu_page, contact_api

urlpatterns = [
    path("", homepage),
    path("menu/", menu_page),
    path("contact/", contact_api),
]
