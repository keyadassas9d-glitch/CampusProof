from django.urls import path
from .views import (
    create_item,
    get_items,
    get_item_detail,
    create_claim,
    get_claims,
    update_claim,
)

urlpatterns = [
    path("create/", create_item, name="create_item"),
    path("", get_items, name="get_items"),
    path("<int:item_id>/", get_item_detail, name="get_item_detail"),
    path("<int:item_id>/claim/", create_claim, name="create_claim"),
    path("claims/", get_claims, name="get_claims"),
path("claims/<int:claim_id>/", update_claim, name="update_claim"),
]