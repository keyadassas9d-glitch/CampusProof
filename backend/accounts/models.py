from django.db import models


class User(models.Model):
    full_name = models.CharField(max_length=100)
    registration_number = models.CharField(
        max_length=50,
        unique=True
    )
    email = models.EmailField(
        blank=True,
        null=True
    )
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.registration_number