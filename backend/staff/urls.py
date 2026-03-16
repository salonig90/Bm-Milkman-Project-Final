from django.urls import path
from .views import StaffLoginView, StaffRegisterView, StaffDetailView, DashboardStatsView

urlpatterns = [
    path('login/', StaffLoginView.as_view(), name='staff-login'),
    path('register/', StaffRegisterView.as_view(), name='staff-register'),
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('<int:pk>/', StaffDetailView.as_view(), name='staff-detail'),
]
