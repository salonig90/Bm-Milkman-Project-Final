from rest_framework import serializers
from .models import Subscription
from customer.models import Customer

class SubscriptionSerializer(serializers.ModelSerializer):
    def _resolve_email_from_customer(self, customer_name):
        if not customer_name:
            return None
        customer = Customer.objects.filter(name__iexact=str(customer_name).strip()).order_by('-id').first()
        return customer.email if customer else None

    def validate(self, attrs):
        # If the frontend sends a placeholder/fallback email, prefer the real one
        # from the registered Customer record (when name matches).
        customer_name = attrs.get('customer_name')
        posted_email = attrs.get('customer_email')
        resolved_email = self._resolve_email_from_customer(customer_name)

        if resolved_email and (not posted_email or str(posted_email).endswith('@example.com')):
            attrs['customer_email'] = resolved_email

        return attrs

    def to_representation(self, instance):
        # For legacy rows that stored placeholder emails, display the real email.
        data = super().to_representation(instance)
        resolved_email = self._resolve_email_from_customer(getattr(instance, 'customer_name', None))
        if resolved_email and str(getattr(instance, 'customer_email', '')).endswith('@example.com'):
            data['customer_email'] = resolved_email
        return data

    class Meta:
        model = Subscription
        fields = '__all__'
