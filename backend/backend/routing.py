from general import middleware
from channels.routing import ProtocolTypeRouter, URLRouter, ChannelNameRouter

# TODO: Put Consumerlist in settings.py

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    # 'websocket': middleware.JsonTokenAuthMiddlewareStack(
    #     URLRouter(
    #         yt_download.routing.websocket_urlpatterns
    #     )
    # ),
    # "channel": ChannelNameRouter({
    #     "song_update_default": yt_download.consumers.ChatConsumer,
    # }),
})