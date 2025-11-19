from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet
from django.urls import path
from .views import MyApiViewSet


router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'my-api', MyApiViewSet, basename='my-api')

urlpatterns = router.urls