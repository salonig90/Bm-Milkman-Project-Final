from django.urls import path
from .views import CustomerListCreate, CustomerDetail

urlpatterns = [
    path('', CustomerListCreate.as_view(), name='customer-list-create'),
    path('<int:pk>/', CustomerDetail.as_view(), name='customer-detail'),
]
