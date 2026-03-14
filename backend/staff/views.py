from rest_framework import status, generics
from rest_framework.response import Response
from .models import StaffProfile
from .serializers import StaffProfileSerializer, StaffLoginSerializer

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
