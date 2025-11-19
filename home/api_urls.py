from rest_framework.routers import DefaultRouter
from .api import RestaurantInfoViewSet, MenuItemViewSet, FeedbackViewSet, ReservationViewSet

router = DefaultRouter()
router.register(r'info', RestaurantInfoViewSet, basename='restaurantinfo')
router.register(r'menu-items', MenuItemViewSet, basename='menuitem')
router.register(r'feedback', FeedbackViewSet, basename='feedback')
router.register(r'reservations', ReservationViewSet, basename='reservation')

urlpatterns = router.urls
