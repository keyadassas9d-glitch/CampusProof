from django.urls import path
from .views import create_item, get_items

urlpatterns = [
    path("create/", create_item, name="create_item"),
    path("all/", get_items, name="get_items"),
]