from rest_framework import status, generics
from rest_framework.response import Response
from .models import Customer
from .serializers import CustomerSerializer

class CustomerListView(generics.ListAPIView):
    permission_classes = []
    queryset = Customer.objects.all().order_by('-id')
    serializer_class = CustomerSerializer

class CustomerRegisterView(generics.ListCreateAPIView):
    permission_classes = [] # Allow anyone to register
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = []
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerLoginView(generics.GenericAPIView):
    permission_classes = []
    serializer_class = CustomerSerializer

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            customer = Customer.objects.get(email=email, password=password)
            serializer = self.get_serializer(customer)
            return Response({'message': 'Login successful', 'customer': serializer.data})
        except Customer.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
