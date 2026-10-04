from django.db import models
from accounts.models import User


class Item(models.Model):

    ITEM_TYPE_CHOICES = [
        ("lost", "Lost"),
        ("found", "Found"),
    ]

    STATUS_CHOICES = [
        ("active", "Active"),
        ("matched", "Matched"),
        ("claimed", "Claimed"),
    ]

    name = models.CharField(max_length=200)

    item_type = models.CharField(
        max_length=10,
        choices=ITEM_TYPE_CHOICES
    )

    description = models.TextField()

    location = models.CharField(max_length=200)

    date = models.DateField()

    category = models.CharField(max_length=100)

    image = models.ImageField(
        upload_to="items/",
        blank=True,
        null=True
    )

    reported_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reported_items"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="active"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


class Claim(models.Model):

    CLAIM_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    item = models.ForeignKey(
        Item,
        on_delete=models.CASCADE,
        related_name="claims"
    )

    claimed_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="claims"
    )

    message = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=CLAIM_STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.claimed_by.full_name} - {self.item.name}"