from django.urls import path
from .views import StaffLoginView, StaffRegisterView, StaffDetailView

urlpatterns = [
    path('login/', StaffLoginView.as_view(), name='staff-login'),
    path('register/', StaffRegisterView.as_view(), name='staff-register'),
    path('<int:pk>/', StaffDetailView.as_view(), name='staff-detail'),
]
