from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from users.models import User
from customers.models import Customer
from categories.models import Category
from products.models import Product
from subscriptions.models import Subscription

class MilkmanAPITests(APITestCase):

    def setUp(self):
        # Setup initial data for tests
        self.user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123",
            "address": "Test Address",
            "phone": "1234567890"
        }
        self.customer_data = {
            "name": "Test Customer",
            "address": "Customer Address",
            "phone": "0987654321"
        }
        self.category_data = {"name": "Cow Milk"}

    def test_create_user(self):
        """Test creating a new user"""
        url = reverse('user-list-create')
        response = self.client.post(url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().name, 'Test User')

    def test_create_customer(self):
        """Test creating a new customer"""
        url = reverse('customer-list-create')
        response = self.client.post(url, self.customer_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 1)

    def test_create_category_and_product(self):
        """Test creating a category and then a product"""
        # 1. Create Category
        cat_url = reverse('category-list-create')
        cat_response = self.client.post(cat_url, self.category_data, format='json')
        self.assertEqual(cat_response.status_code, status.HTTP_201_CREATED)
        category_id = cat_response.data['id']

        # 2. Create Product linked to Category
        product_data = {
            "name": "Fresh Milk",
            "quantity_type": "1 lit",
            "price": 50.0,
            "category": category_id
        }
        prod_url = reverse('product-list-create')
        prod_response = self.client.post(prod_url, product_data, format='json')
        self.assertEqual(prod_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().category.id, category_id)

    def test_create_subscription(self):
        """Test creating a subscription for a user and category"""
        # Create User
        user = User.objects.create(**self.user_data)
        # Create Category
        category = Category.objects.create(name="Buffalo Milk")
        
        subscription_data = {
            "user": user.id,
            "category": category.id,
            "start_date": "2023-01-01",
            "end_date": "2023-01-31"
        }
        
        url = reverse('subscription-list-create')
        response = self.client.post(url, subscription_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Subscription.objects.count(), 1)
