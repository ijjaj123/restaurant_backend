from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import RestaurantInfo, MenuItem, Feedback
import json

# -------------------------------
# 1. Homepage API (GET)
# -------------------------------
def homepage(request):
    info = RestaurantInfo.objects.first()

    if not info:
        return JsonResponse({"error": "Restaurant info not found"}, status=404)

    data = {
        "name": info.name,
        "phone": info.phone,
        "address": info.address,
        "opening_hours": info.opening_hours,  # JSON field
    }

    return JsonResponse(data)


# -------------------------------
# 2. Menu API (GET)
# -------------------------------
def menu_page(request):
    items = MenuItem.objects.filter(is_active=True)

    data = [
        {
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "price": float(item.price),
            "image": item.image.url if item.image else None,
        }
        for item in items
    ]

    return JsonResponse(data, safe=False)


# -------------------------------
# 3. Contact Form API (POST)
# -------------------------------
@csrf_exempt
def contact_api(request):
    if request.method == "POST":
        body = json.loads(request.body)

        name = body.get("name")
        email = body.get("email")
        message = body.get("message")

        Feedback.objects.create(
            name=name,
            email=email,
            comment=message,
        )

        return JsonResponse({"status": "success", "message": "Feedback saved"})

    return JsonResponse({"error": "Invalid method"}, status=400)
