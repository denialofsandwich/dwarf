from rest_framework.request import Request
import time

from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser

from django.db import close_old_connections
from rest_framework_jwt.authentication import BaseJSONWebTokenAuthentication

from channels.db import database_sync_to_async
from rest_framework import exceptions
from http import cookies

class DelayMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        time.sleep(1)
        return self.get_response(request)


class JsonWebTokenAuthenticationFromScope(BaseJSONWebTokenAuthentication):
    def get_jwt_value(self, scope):
        try:
            cookie = next(x for x in scope['headers'] if x[0].decode('utf-8') == 'cookie')[1].decode('utf-8')
            return cookies.SimpleCookie(cookie)['JWT'].value
        except:
            return None

    # Works like a charm, but js doesnt support setting custom headers (i hate js)
    # def get_jwt_value(self, scope):
    #     print(scope)
    #     headers = dict(scope['headers'])
    #     if b'authorization' in headers:
    #         try:
    #             token_name, token_key = headers[b'authorization'].decode().split()
    #             if token_name == 'JWT':
    #                 return token_key
    #         except:
    #             return None

    #     return None


@database_sync_to_async
def auth_user(scope):
    try:
        user, data = JsonWebTokenAuthenticationFromScope().authenticate(scope)
        return user
    except exceptions.AuthenticationFailed:
        return AnonymousUser()
    except TypeError:
        return AnonymousUser()


class JsonTokenAuthMiddlewareInstance:
    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        close_old_connections()
        self.scope['user'] = await auth_user(self.scope)

        return await self.inner(self.scope)(receive, send)


class JsonTokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return JsonTokenAuthMiddlewareInstance(scope, self)


def JsonTokenAuthMiddlewareStack(inner):
    return JsonTokenAuthMiddleware(AuthMiddlewareStack(inner))
