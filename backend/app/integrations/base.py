from abc import ABC, abstractmethod
from datetime import datetime
from typing import Iterable

from ..models import Channel, Product


class IntegrationClient(ABC):
    channel: Channel

    def __init__(self, settings: dict):
        self.settings = settings
        self.connected = True
        self.last_sync: datetime | None = None

    @abstractmethod
    def sync_products(self, products: Iterable[Product]) -> int:
        """Synchronise products with the remote marketplace.

        Returns the number of products that were updated.
        """


class MockIntegrationClient(IntegrationClient):
    """A mock client that simulates API calls for demo purposes."""

    def sync_products(self, products: Iterable[Product]) -> int:
        products = list(products)
        # Pretend there is network activity by iterating products
        self.last_sync = datetime.utcnow()
        return len(products)
