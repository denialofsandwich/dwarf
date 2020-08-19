from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from . import serializers
from rest_framework.pagination import PageNumberPagination


class UserView(viewsets.ReadOnlyModelViewSet):
    model = User
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
