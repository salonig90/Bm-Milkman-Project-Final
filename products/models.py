from django.db import models
from categories.models import Category

class Product(models.Model):
    name = models.CharField(max_length=100)
    quantity_type = models.CharField(max_length=50)  # e.g., 1/2 lit, 1 lit, 2 lit
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return f"{self.name} - {self.quantity_type}"