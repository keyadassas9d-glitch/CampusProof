from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Item, Claim
from accounts.models import User
import json
from datetime import datetime


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
            "registration_number":
                item.reported_by.registration_number,
            "image":
                item.image.url if item.image else None,
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
            "registration_number":
                item.reported_by.registration_number,
            "image":
                item.image.url if item.image else None,
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


# Find possible matches for an item
def get_matches(request, item_id):

    if request.method != "GET":
        return JsonResponse(
            {
                "error":
                "Only GET requests are allowed"
            },
            status=405
        )

    try:

        # Get selected item
        item = Item.objects.get(
            id=item_id
        )

        # Find opposite item type
        opposite_type = (
            "found"
            if item.item_type == "lost"
            else "lost"
        )

        # Get active opposite items
        possible_items = Item.objects.filter(
            item_type=opposite_type,
            status="active"
        )

        matches = []

        # Convert current item information to lowercase
        item_name = item.name.lower()
        item_description = item.description.lower()
        item_category = item.category.lower()
        item_location = item.location.lower()

        for possible_item in possible_items:

            score = 0
            reasons = []

            # -----------------------------
            # CATEGORY MATCH
            # -----------------------------

            if (
                possible_item.category.lower()
                == item_category
            ):

                score += 35

                reasons.append(
                    "Same category"
                )

            # -----------------------------
            # ITEM NAME MATCH
            # -----------------------------

            possible_name = (
                possible_item.name.lower()
            )

            if (
                item_name in possible_name
                or possible_name in item_name
            ):

                score += 30

                reasons.append(
                    "Similar item name"
                )

            # -----------------------------
            # LOCATION MATCH
            # -----------------------------

            if (
                possible_item.location.lower()
                == item_location
            ):

                score += 20

                reasons.append(
                    "Same location"
                )

            # -----------------------------
            # DESCRIPTION MATCH
            # -----------------------------

            item_words = set(
                item_description.split()
            )

            possible_words = set(
                possible_item.description
                .lower()
                .split()
            )

            common_words = (
                item_words &
                possible_words
            )

            # Ignore very short words
            useful_words = {
                word
                for word in common_words
                if len(word) > 3
            }

            if useful_words:

                description_score = min(
                    len(useful_words) * 5,
                    15
                )

                score += description_score

                reasons.append(
                    "Similar description"
                )

            # -----------------------------
            # DATE MATCH
            # -----------------------------

            try:

                item_date = datetime.strptime(
                    str(item.date),
                    "%Y-%m-%d"
                ).date()

                possible_date = datetime.strptime(
                    str(possible_item.date),
                    "%Y-%m-%d"
                ).date()

                days_difference = abs(
                    (item_date - possible_date).days
                )

                if days_difference == 0:

                    score += 15

                    reasons.append(
                        "Same date"
                    )

                elif days_difference <= 3:

                    score += 10

                    reasons.append(
                        "Date within 3 days"
                    )

                elif days_difference <= 7:

                    score += 5

                    reasons.append(
                        "Date within 7 days"
                    )

            except ValueError:

                pass

            # -----------------------------
            # LIMIT SCORE TO 100
            # -----------------------------

            score = min(
                score,
                100
            )

            # -----------------------------
            # ONLY RETURN STRONG MATCHES
            # -----------------------------

            if score >= 30:

                matches.append({

                    "id":
                    possible_item.id,

                    "name":
                    possible_item.name,

                    "item_type":
                    possible_item.item_type,

                    "description":
                    possible_item.description,

                    "location":
                    possible_item.location,

                    "date":
                    str(possible_item.date),

                    "category":
                    possible_item.category,

                    "status":
                    possible_item.status,

                    "match_score":
                    score,

                    "match_reasons":
                    reasons,

                    "image":
                    (
                        possible_item.image.url
                        if possible_item.image
                        else None
                    ),
                })

        # Highest score first
        matches.sort(
            key=lambda x:
            x["match_score"],
            reverse=True
        )

        return JsonResponse({

            "item_id":
            item.id,

            "matches":
            matches,

            "count":
            len(matches)

        })

    except Item.DoesNotExist:

        return JsonResponse(
            {
                "error":
                "Item not found"
            },
            status=404
        )

    except Exception as e:

        return JsonResponse(
            {
                "error":
                str(e)
            },
            status=500
        )