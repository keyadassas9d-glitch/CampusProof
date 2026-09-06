from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Item
from accounts.models import User
import json


@csrf_exempt
def create_item(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        name = data.get("name")
        item_type = data.get("item_type")
        description = data.get("description")
        location = data.get("location")
        date = data.get("date")
        category = data.get("category")
        registration_number = data.get("registration_number")

        if not all([
            name,
            item_type,
            description,
            location,
            date,
            category,
            registration_number
        ]):
            return JsonResponse(
                {"error": "All fields are required"},
                status=400
            )

        try:
            user = User.objects.get(
                registration_number=registration_number
            )
        except User.DoesNotExist:
            return JsonResponse(
                {"error": "User not found"},
                status=404
            )

        if item_type not in ["lost", "found"]:
            return JsonResponse(
                {"error": "Item type must be lost or found"},
                status=400
            )

        item = Item.objects.create(
            name=name,
            item_type=item_type,
            description=description,
            location=location,
            date=date,
            category=category,
            reported_by=user
        )

        return JsonResponse(
            {
                "message": "Item reported successfully",
                "item": {
                    "id": item.id,
                    "name": item.name,
                    "item_type": item.item_type,
                    "description": item.description,
                    "location": item.location,
                    "date": str(item.date),
                    "category": item.category,
                    "status": item.status
                }
            },
            status=201
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON data"},
            status=400
        )

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )


# Get all lost and found items
def get_items(request):

    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET requests are allowed"},
            status=405
        )

    items = Item.objects.all().order_by("-created_at")

    items_data = []

    for item in items:
        items_data.append({
            "id": item.id,
            "name": item.name,
            "item_type": item.item_type,
            "description": item.description,
            "location": item.location,
            "date": str(item.date),
            "category": item.category,
            "status": item.status,
        })

    return JsonResponse({
        "items": items_data,
        "count": len(items_data)
    })