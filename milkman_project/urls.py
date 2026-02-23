from django.contrib import admin
from django.urls import path, include

from .views import api_root

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root, name='api-root'),
    path('api/users/', include('users.urls')),
    path('api/categories/', include('categories.urls')),
    path('api/products/', include('products.urls')),
    path('api/subscriptions/', include('subscriptions.urls')),
    path('api/customers/', include('customers.urls')),
]
