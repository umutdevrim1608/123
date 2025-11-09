from datetime import datetime
from typing import Dict, Iterable, List
from urllib.parse import quote_plus

from fastapi import HTTPException

from .config import settings
from .integrations.amazon import AmazonClient
from .integrations.base import IntegrationClient
from .integrations.ebay import EbayClient
from .integrations.etsy import EtsyClient
from .models import (
    BulkUpdateResult,
    BulkUploadResult,
    Channel,
    GeneratedImage,
    ImageGenerationRequest,
    ImageGenerationResult,
    IntegrationStatus,
    Product,
    ProductAnalysisInsight,
    ProductAnalysisRequest,
    ProductCreate,
    ProductUpdate,
    SEOGenerationRequest,
    SEOGenerationResult,
    SyncResult,
)
from . import storage


class IntegrationRegistry:
    def __init__(self) -> None:
        self._clients: Dict[Channel, IntegrationClient] = {
            Channel.amazon: AmazonClient(settings.integrations["amazon"]),
            Channel.ebay: EbayClient(settings.integrations["ebay"]),
            Channel.etsy: EtsyClient(settings.integrations["etsy"]),
        }

    def get_statuses(self) -> List[IntegrationStatus]:
        return [
            IntegrationStatus(
                channel=client.channel,
                connected=client.connected,
                last_sync=client.last_sync,
                details=f"Configured with {client.settings}" if client.settings else None,
            )
            for client in self._clients.values()
        ]

    def sync_all(self, products: Iterable[Product]) -> List[SyncResult]:
        results = []
        products_list = list(products)
        for client in self._clients.values():
            started_at = datetime.utcnow()
            synced = client.sync_products(products_list)
            results.append(
                SyncResult(
                    channel=client.channel,
                    synced_products=synced,
                    started_at=started_at,
                    completed_at=client.last_sync or datetime.utcnow(),
                    status="success",
                    message=f"{synced} products synced to {client.channel.value.title()}",
                )
            )
        return results


registry = IntegrationRegistry()


def bootstrap() -> None:
    storage.init_db()


def list_products() -> List[Product]:
    return storage.list_products()


def bulk_upload(products: Iterable[ProductCreate]) -> BulkUploadResult:
    products = list(products)
    created = storage.upsert_products(products)
    updated = len(products) - created
    return BulkUploadResult(created=created, updated=updated)


def bulk_update(updates: Iterable[ProductUpdate]) -> BulkUpdateResult:
    updated = storage.bulk_update(updates)
    return BulkUpdateResult(updated=updated)


def sync_all_channels() -> List[SyncResult]:
    products = storage.list_products()
    return registry.sync_all(products)


def get_integration_status() -> List[IntegrationStatus]:
    return registry.get_statuses()


def analyze_product(payload: ProductAnalysisRequest) -> ProductAnalysisInsight:
    normalized_price = min(max(payload.price, 1.0), 9999.0)
    normalized_stock = payload.stock

    base_score = 55
    if normalized_stock < 10:
        base_score -= 8
    elif normalized_stock > 200:
        base_score += 6

    if normalized_price < 20:
        base_score += 5
    elif normalized_price > 200:
        base_score -= 5

    description_length = len(payload.description or "")
    if description_length < 120:
        base_score -= 7
    elif description_length > 400:
        base_score += 4

    demand = "medium"
    if normalized_stock < 20 and normalized_price < 50:
        demand = "high"
        base_score += 6
    elif normalized_stock > 100 and normalized_price > 150:
        demand = "low"
        base_score -= 6

    score = max(10, min(95, base_score))

    recommendations: List[str] = []
    if description_length < 150:
        recommendations.append("Extend the description to highlight unique benefits and keywords.")
    if payload.stock < 20:
        recommendations.append("Increase stock to avoid missing out on high demand.")
    if payload.price > 150:
        recommendations.append("Consider testing promotional pricing to improve conversion.")
    if not payload.category:
        recommendations.append("Add a clear category to improve marketplace discovery.")

    suggested_price = round(payload.price * (0.95 if payload.price > 150 else 1.05), 2)

    return ProductAnalysisInsight(
        health_score=int(score),
        demand=demand,
        recommendations=recommendations or [
            "Keep monitoring performance to discover optimisation opportunities."
        ],
        suggested_price=suggested_price,
    )


def generate_seo_content(payload: SEOGenerationRequest) -> SEOGenerationResult:
    base_keywords = {kw.strip() for kw in payload.keywords if kw.strip()}
    title_tokens = payload.title.split()
    base_keywords.update(token.lower() for token in title_tokens if len(token) > 3)

    language_templates = {
        "en": {
            "headline": "Premium",
            "callout": "crafted for global marketplaces",
            "cta": "Shop now",
        },
        "tr": {
            "headline": "Premium",
            "callout": "global pazaryerleri için hazır",
            "cta": "Hemen keşfet",
        },
        "fr": {
            "headline": "Premium",
            "callout": "pensé pour les places de marché mondiales",
            "cta": "Découvrez maintenant",
        },
        "de": {
            "headline": "Premium",
            "callout": "für globale Marktplätze entwickelt",
            "cta": "Jetzt entdecken",
        },
    }

    template = language_templates.get(payload.language.lower(), language_templates["en"])

    optimized_title = f"{template['headline']} {payload.title.strip()} — {template['callout']}"
    description_body = payload.description.strip() or "Designed to outperform competitors with actionable insights."
    optimized_description = (
        f"{description_body} {template['cta']} with fast fulfilment, trusted reviews and smart pricing."
    )

    keywords = sorted(base_keywords)[:12]

    return SEOGenerationResult(
        optimized_title=optimized_title,
        optimized_description=optimized_description,
        keywords=keywords,
    )


def _ratio_to_resolution(ratio: str) -> tuple[int, int]:
    presets = {
        "1:1": (512, 512),
        "4:5": (512, 640),
        "3:2": (576, 384),
        "16:9": (640, 360),
        "9:16": (360, 640),
    }
    return presets.get(ratio, (512, 512))


def generate_images(payload: ImageGenerationRequest) -> ImageGenerationResult:
    if payload.count > 10:
        raise HTTPException(status_code=400, detail="A maximum of 10 images can be generated at once.")

    width, height = _ratio_to_resolution(payload.aspect_ratio)
    safe_prompt = payload.prompt.strip() or "Product"

    images: List[GeneratedImage] = []
    for index in range(payload.count):
        label = quote_plus(f"{safe_prompt[:12]}-{index + 1}")
        url = f"https://dummyimage.com/{width}x{height}/0f172a/ffffff.png&text={label}"
        images.append(
            GeneratedImage(
                url=url,
                prompt=f"{safe_prompt} ({payload.aspect_ratio}) variation {index + 1}",
            )
        )

    return ImageGenerationResult(images=images)
