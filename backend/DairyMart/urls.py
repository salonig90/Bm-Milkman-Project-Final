from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from customer.views import CustomerListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/customer/', include('customer.urls')),
    path('api/customers/', CustomerListView.as_view(), name='customer-list'),
    path('api/staff/', include('staff.urls')),
    path('api/categories/', include('category.urls')),
    path('api/products/', include('product.urls')),
    path('api/subscriptions/', include('subscription.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
