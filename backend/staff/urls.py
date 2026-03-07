from django.urls import path
from .views import StaffLoginView, StaffRegisterView

urlpatterns = [
    path('login/', StaffLoginView.as_view(), name='staff-login'),
    path('register/', StaffRegisterView.as_view(), name='staff-register'),
]
