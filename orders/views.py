from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import CartItem, Order, OrderItem
from .serializers import CartItemSerializer, OrderSerializer
from products.models import Product
from django.db import transaction

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user).select_related('product')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=user).order_by('-created_at')

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        Create Order from provided items OR from user's cart.
        Expected payload:
        {
          "shipping_address": "...",
          "items": [{"product_id": 1, "quantity": 2}, ...]  # optional if using cart
        }
        """
        user = request.user
        data = request.data
        items = data.get('items', None)

        if not items:
            # use cart
            cart_items = CartItem.objects.filter(user=user)
            if not cart_items.exists():
                return Response({"detail": "No items in cart"}, status=status.HTTP_400_BAD_REQUEST)
            items = [{"product_id": ci.product.id, "quantity": ci.quantity} for ci in cart_items]

        total = 0
        order = Order.objects.create(user=user, shipping_address=data.get('shipping_address',''))
        order_items = []
        for it in items:
            pid = it.get('product_id')
            qty = int(it.get('quantity',1))
            try:
                product = Product.objects.get(pk=pid)
            except Product.DoesNotExist:
                transaction.set_rollback(True)
                return Response({"detail": f"Product {pid} not found"}, status=status.HTTP_400_BAD_REQUEST)
            price = product.price
            oi = OrderItem.objects.create(order=order, product=product, quantity=qty, price=price)
            total += price * qty
            order_items.append(oi)
        order.total_amount = total
        order.save()
        # clear cart if used
        CartItem.objects.filter(user=user).delete()
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
