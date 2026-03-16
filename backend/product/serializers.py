import json
from rest_framework import serializers
from .models import Product, Cart, Order

class ProductSerializer(serializers.ModelSerializer):
    price_data = serializers.JSONField(required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def to_internal_value(self, data):
        # Multipart form data sends everything as strings. 
        # We need to parse price_data back into a Python object (list/dict)
        # before the JSONField tries to validate it.
        
        # 1. Work with a mutable copy
        if hasattr(data, 'dict'):
            # This handles QueryDict (standard for multipart/form-data)
            data = data.dict()
        else:
            # This handles regular dict
            data = data.copy()

        # 2. Parse price_data if it exists and is a string
        price_data = data.get('price_data')
        if price_data and isinstance(price_data, str):
            try:
                data['price_data'] = json.loads(price_data)
            except (json.JSONDecodeError, TypeError):
                # If it's not valid JSON string, leave it for the field to raise its own error
                pass
        
        # 3. Proceed with standard validation
        return super().to_internal_value(data)

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
