from rest_framework import serializers
from django.contrib.auth.models import User
import json


class UserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'permissions',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'is_superuser',
            'last_login',
            'date_joined'
        ]

    def get_permissions(self, obj):
        permissions = set()
        groups = obj.groups
        for group in groups.all():
            for permission in group.permissions.all():
                permissions.add(permission.codename)
        for permission in obj.user_permissions.all():
            permissions.add(permission.codename)
        return permissions
