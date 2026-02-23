from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "Welcome to the Milkman API!",
        "available_endpoints": {
            "users": "/api/users/",
            "customers": "/api/customers/",
            "categories": "/api/categories/",
            "products": "/api/products/",
            "subscriptions": "/api/subscriptions/",
            "admin": "/admin/"
        }
    })
