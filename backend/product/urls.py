from django.urls import path
from .views import (
    ProductListCreateView, ProductDetailView,
    CartListCreateView, CartDetailView,
    OrderListCreateView, OrderDetailView
)

urlpatterns = [
    path('list/', ProductListCreateView.as_view(), name='product-list-create'),
    path('list/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('cart/', CartListCreateView.as_view(), name='cart-list-create'),
    path('cart/<int:pk>/', CartDetailView.as_view(), name='cart-detail'),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
]
