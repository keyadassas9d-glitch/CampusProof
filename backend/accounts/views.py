from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import json

from .models import User


# REGISTER USER
@csrf_exempt
def register_user(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        full_name = data.get("full_name")
        registration_number = data.get("registration_number")
        password = data.get("password")

        if not full_name or not registration_number or not password:
            return JsonResponse(
                {
                    "error": "Name, registration number and password are required"
                },
                status=400
            )

        if User.objects.filter(
            registration_number=registration_number
        ).exists():
            return JsonResponse(
                {"error": "Registration number already exists"},
                status=400
            )

        user = User.objects.create(
            full_name=full_name,
            registration_number=registration_number,
            password=make_password(password)
        )

        return JsonResponse(
            {
                "message": "Account created successfully",
                "user_id": user.id
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


# LOGIN USER
@csrf_exempt
def login_user(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        registration_number = data.get("registration_number")
        password = data.get("password")

        if not registration_number or not password:
            return JsonResponse(
                {
                    "error": "Registration number and password are required"
                },
                status=400
            )

        try:
            user = User.objects.get(
                registration_number=registration_number
            )

        except User.DoesNotExist:
            return JsonResponse(
                {
                    "error": "Invalid registration number or password"
                },
                status=401
            )

        if not check_password(password, user.password):
            return JsonResponse(
                {
                    "error": "Invalid registration number or password"
                },
                status=401
            )

        return JsonResponse(
            {
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "full_name": user.full_name,
                    "registration_number": user.registration_number,
                }
            },
            status=200
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