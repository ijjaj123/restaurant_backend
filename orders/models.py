from django.db import models
from django.conf import settings
from products.models import Product

class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')

    def line_total(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.user} - {self.product} x {self.quantity}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending','Pending'),
        ('processing','Processing'),
        ('completed','Completed'),
        ('cancelled','Cancelled'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    shipping_address = models.TextField(blank=True)

    def __str__(self):
        return f"Order #{self.id} - {self.status}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # snapshot with default

    def line_total(self):
        return self.price * self.quantity

    def __str__(self):
        return f"{self.order} | {self.product} x {self.quantity}"
