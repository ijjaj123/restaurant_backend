from rest_framework import viewsets, filters, permissions
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

from rest_framework import viewsets
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response

class MyApiViewSet(viewsets.ViewSet):

    @swagger_auto_schema(
        operation_description="Get a list of items",
        responses={200: "Success"}
    )
    def list(self, request):  # 'list' method corresponds to GET on the collection
        return Response({"message": "Hello Swagger"})


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
