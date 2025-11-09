from .base import MockIntegrationClient
from ..models import Channel


class EbayClient(MockIntegrationClient):
    channel = Channel.ebay
