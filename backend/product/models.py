from django.db import models
from django.utils import timezone

class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='Milk')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    price_data = models.JSONField(default=list, blank=True) # [{"quantity": "1L", "price": 65}, {"quantity": "500ml", "price": 35}]
    stock = models.CharField(max_length=50, default='In Stock')
    quantity = models.CharField(max_length=50, default='1L')
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=50, default='Active')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Cart(models.Model):
    customer_email = models.EmailField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.customer_email} - {self.product.name}"

class Order(models.Model):
    customer_email = models.EmailField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=50, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} for {self.customer_email}"
