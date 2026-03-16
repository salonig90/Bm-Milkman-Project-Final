from django.db import models
from django.utils import timezone

class Subscription(models.Model):
    customer_name = models.CharField(max_length=200, default='Anonymous')
    customer_email = models.EmailField()
    plan_name = models.CharField(max_length=100, blank=True, null=True)
    product_name = models.CharField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=100, default='Milk')
    quantity = models.PositiveIntegerField(default=1)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default='Active')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.plan_name or self.product_name} for {self.customer_name}"
