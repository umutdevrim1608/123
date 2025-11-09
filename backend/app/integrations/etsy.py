from .base import MockIntegrationClient
from ..models import Channel


class EtsyClient(MockIntegrationClient):
    channel = Channel.etsy
