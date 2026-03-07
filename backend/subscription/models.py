from django.db import models
from product.models import Product

class Subscription(models.Model):
    customer_email = models.EmailField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=50, default='Active')

    def __str__(self):
        return f"{self.product.name} subscription for {self.customer_email}"
