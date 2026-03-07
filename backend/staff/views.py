from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .models import StaffProfile
from .serializers import StaffProfileSerializer, StaffLoginSerializer

class StaffLoginView(GenericAPIView):
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

class StaffRegisterView(GenericAPIView):
    permission_classes = []
    serializer_class = StaffProfileSerializer
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
