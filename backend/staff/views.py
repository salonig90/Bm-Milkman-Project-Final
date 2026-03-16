from rest_framework import status, generics
from rest_framework.response import Response
from .models import StaffProfile
from .serializers import StaffProfileSerializer, StaffLoginSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from product.models import Order, Product
from customer.models import Customer
from subscription.models import Subscription

class DashboardStatsView(APIView):
    def get(self, request):
        total_orders = Order.objects.count()
        active_users = Customer.objects.filter(is_active=True).count()
        subscribers = Subscription.objects.filter(status='Active').count()
        
        # Calculate revenue from orders
        # Sum price of product for each order
        revenue = Order.objects.aggregate(total=Sum('product__price'))['total'] or 0
        
        return Response({
            'total_orders': total_orders,
            'active_users': active_users,
            'subscribers': subscribers,
            'revenue': f"₹{revenue:,}"
        })

class StaffLoginView(generics.GenericAPIView):
    permission_classes = []
    serializer_class = StaffLoginSerializer
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        try:
            staff = StaffProfile.objects.get(email=email, password=password)
            serializer = StaffProfileSerializer(staff)
            return Response({'message': 'Login successful', 'staff': serializer.data})
        except StaffProfile.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class StaffRegisterView(generics.ListCreateAPIView):
    permission_classes = []
    queryset = StaffProfile.objects.all()
    serializer_class = StaffProfileSerializer

class StaffDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = []
    queryset = StaffProfile.objects.all()
    serializer_class = StaffProfileSerializer
