from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Item, Claim
from accounts.models import User
import json


# Create a lost or found item
@csrf_exempt
def create_item(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed"},
            status=405
        )

    try:
        # Get normal form data
        name = request.POST.get("name")
        item_type = request.POST.get("item_type")
        description = request.POST.get("description")
        location = request.POST.get("location")
        date = request.POST.get("date")
        category = request.POST.get("category")
        registration_number = request.POST.get("registration_number")

        # Get uploaded image
        image = request.FILES.get("image")

        # Validate required fields
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

        # Find user
        try:
            user = User.objects.get(
                registration_number=registration_number
            )
        except User.DoesNotExist:
            return JsonResponse(
                {"error": "User not found"},
                status=404
            )

        # Validate item type
        if item_type not in ["lost", "found"]:
            return JsonResponse(
                {"error": "Item type must be lost or found"},
                status=400
            )

        # Create item
        item = Item.objects.create(
            name=name,
            item_type=item_type,
            description=description,
            location=location,
            date=date,
            category=category,
            image=image,
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
                    "status": item.status,
                    "image": item.image.url if item.image else None,
                }
            },
            status=201
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
            "registration_number": item.reported_by.registration_number,
            "image": item.image.url if item.image else None,
        })

    return JsonResponse({
        "items": items_data,
        "count": len(items_data)
    })


# Get details of one item
def get_item_detail(request, item_id):

    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET requests are allowed"},
            status=405
        )

    try:

        item = Item.objects.get(id=item_id)

        return JsonResponse({
            "id": item.id,
            "name": item.name,
            "item_type": item.item_type,
            "description": item.description,
            "location": item.location,
            "date": str(item.date),
            "category": item.category,
            "status": item.status,
            "registration_number": item.reported_by.registration_number,
            "image": item.image.url if item.image else None,
        })

    except Item.DoesNotExist:

        return JsonResponse(
            {"error": "Item not found"},
            status=404
        )


# Create a claim for an item
@csrf_exempt
def create_claim(request, item_id):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed"},
            status=405
        )

    try:

        data = json.loads(request.body)

        registration_number = data.get(
            "registration_number"
        )

        message = data.get(
            "message",
            ""
        )

        if not registration_number:
            return JsonResponse(
                {"error": "Registration number is required"},
                status=400
            )

        # Find item
        try:

            item = Item.objects.get(
                id=item_id
            )

        except Item.DoesNotExist:

            return JsonResponse(
                {"error": "Item not found"},
                status=404
            )

        # Find user
        try:

            user = User.objects.get(
                registration_number=registration_number
            )

        except User.DoesNotExist:

            return JsonResponse(
                {"error": "User not found"},
                status=404
            )

        # Only found items can be claimed
        if item.item_type != "found":

            return JsonResponse(
                {
                    "error":
                    "Only found items can be claimed"
                },
                status=400
            )

        # Don't allow claiming already claimed items
        if item.status == "claimed":

            return JsonResponse(
                {
                    "error":
                    "This item has already been claimed"
                },
                status=400
            )

        # Create claim
        claim = Claim.objects.create(
            item=item,
            claimed_by=user,
            message=message
        )

        return JsonResponse(
            {
                "message":
                "Claim submitted successfully",

                "claim": {
                    "id": claim.id,
                    "item_id": item.id,
                    "item_name": item.name,
                    "status": claim.status
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


# Get all claims for admin
def get_claims(request):

    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET requests are allowed"},
            status=405
        )

    claims = Claim.objects.all().order_by(
        "-created_at"
    )

    claims_data = []

    for claim in claims:

        claims_data.append({
            "id": claim.id,
            "item_id": claim.item.id,
            "item_name": claim.item.name,
            "item_type": claim.item.item_type,
            "location": claim.item.location,
            "item_status": claim.item.status,
            "claimed_by": claim.claimed_by.full_name,
            "registration_number":
                claim.claimed_by.registration_number,
            "message": claim.message,
            "status": claim.status,
            "created_at":
                claim.created_at.strftime(
                    "%Y-%m-%d %H:%M"
                ),
        })

    return JsonResponse({
        "claims": claims_data,
        "count": len(claims_data)
    })


# Approve or reject a claim
@csrf_exempt
def update_claim(request, claim_id):

    if request.method != "POST":

        return JsonResponse(
            {
                "error":
                "Only POST requests are allowed"
            },
            status=405
        )

    try:

        data = json.loads(
            request.body
        )

        action = data.get(
            "action"
        )

        if action not in [
            "approve",
            "reject"
        ]:

            return JsonResponse(
                {
                    "error":
                    "Action must be approve or reject"
                },
                status=400
            )

        try:

            claim = Claim.objects.get(
                id=claim_id
            )

        except Claim.DoesNotExist:

            return JsonResponse(
                {
                    "error":
                    "Claim not found"
                },
                status=404
            )

        # Don't review a claim twice
        if claim.status != "pending":

            return JsonResponse(
                {
                    "error":
                    "This claim has already been reviewed"
                },
                status=400
            )

        # APPROVE
        if action == "approve":

            claim.status = "approved"

            claim.save()

            claim.item.status = "claimed"

            claim.item.save()

            return JsonResponse(
                {
                    "message":
                    "Claim approved successfully",

                    "claim_status":
                    claim.status,

                    "item_status":
                    claim.item.status
                }
            )

        # REJECT
        else:

            claim.status = "rejected"

            claim.save()

            return JsonResponse(
                {
                    "message":
                    "Claim rejected successfully",

                    "claim_status":
                    claim.status
                }
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