from django.urls import path
from .views import CustomerRegisterView, CustomerLoginView, CustomerDetailView

urlpatterns = [
    path('register/', CustomerRegisterView.as_view(), name='customer-register'),
    path('login/', CustomerLoginView.as_view(), name='customer-login'),
    path('<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
]
