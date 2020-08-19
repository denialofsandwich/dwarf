from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
import django.conf
import importlib

# TODO: Cookie “tabstyle” will be soon treated as cross-site cookie against “http://localhost/example2” because the scheme does not match.
# TODO: Cookie “JWT” will be soon rejected because it has the “sameSite” attribute set to “none” or an invalid value, without the “secure” attribute. To know more about the “sameSite“ attribute, read https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie/SameSite

router = routers.DefaultRouter()
for r_path in django.conf.settings.ENABLED_ROUTERS:
    i_router = importlib.import_module("{}.urls".format(r_path))
    router.registry.extend(i_router.router.registry)

urlpatterns = [
    path('_admin/', admin.site.urls),
    path('_api/', include(router.urls)),
    path('_api/auth/', obtain_jwt_token),
]

