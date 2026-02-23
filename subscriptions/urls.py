from django.urls import path
from .views import SubscriptionListCreate, SubscriptionDetail

urlpatterns = [
    path('', SubscriptionListCreate.as_view(), name='subscription-list-create'),
    path('<int:pk>/', SubscriptionDetail.as_view(), name='subscription-detail'),
]
