from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .models import (
    BulkUpdateResult,
    BulkUploadResult,
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
from . import services

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    services.bootstrap()


@app.get("/products", response_model=list[Product])
def get_products():
    return services.list_products()


@app.post("/products/bulk-upload", response_model=BulkUploadResult)
def post_bulk_upload(products: list[ProductCreate]):
    if not products:
        raise HTTPException(status_code=400, detail="No products provided")
    return services.bulk_upload(products)


@app.patch("/products/bulk-update", response_model=BulkUpdateResult)
def patch_bulk_update(updates: list[ProductUpdate]):
    if not updates:
        raise HTTPException(status_code=400, detail="No updates provided")
    return services.bulk_update(updates)


@app.get("/integrations/status", response_model=list[IntegrationStatus])
def get_integrations_status():
    return services.get_integration_status()


@app.post("/integrations/sync", response_model=list[SyncResult])
def post_sync_integrations():
    return services.sync_all_channels()


@app.post("/ai/analyze", response_model=ProductAnalysisInsight)
def post_ai_analyze(payload: ProductAnalysisRequest):
    return services.analyze_product(payload)


@app.post("/ai/seo", response_model=SEOGenerationResult)
def post_ai_seo(payload: SEOGenerationRequest):
    return services.generate_seo_content(payload)


@app.post("/ai/images", response_model=ImageGenerationResult)
def post_ai_images(payload: ImageGenerationRequest):
    return services.generate_images(payload)
