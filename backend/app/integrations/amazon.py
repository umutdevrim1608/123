from .base import MockIntegrationClient
from ..models import Channel


class AmazonClient(MockIntegrationClient):
    channel = Channel.amazon
