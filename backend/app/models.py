from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field, validator


class Channel(str, Enum):
    amazon = "amazon"
    ebay = "ebay"
    etsy = "etsy"


class ProductBase(BaseModel):
    sku: str = Field(..., description="Unique SKU for the product")
    title: str
    price: float = Field(..., ge=0)
    stock: int = Field(..., ge=0)
    description: Optional[str] = None
    channels: List[Channel] = Field(default_factory=list)

    @validator("sku")
    def sku_upper(cls, value: str) -> str:
        return value.upper()


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    sku: str
    price: Optional[float] = Field(default=None, ge=0)
    stock: Optional[int] = Field(default=None, ge=0)

    @validator("sku")
    def sku_upper(cls, value: str) -> str:
        return value.upper()


class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime


class IntegrationStatus(BaseModel):
    channel: Channel
    connected: bool
    last_sync: Optional[datetime]
    details: Optional[str] = None


class BulkUploadResult(BaseModel):
    created: int
    updated: int


class BulkUpdateResult(BaseModel):
    updated: int


class SyncResult(BaseModel):
    channel: Channel
    synced_products: int
    started_at: datetime
    completed_at: datetime
    status: str
    message: Optional[str] = None


class ProductAnalysisRequest(BaseModel):
    title: str
    description: Optional[str] = None
    price: float = Field(..., ge=0)
    stock: int = Field(..., ge=0)
    category: Optional[str] = None


class ProductAnalysisInsight(BaseModel):
    health_score: int = Field(..., ge=0, le=100)
    demand: str
    recommendations: List[str]
    suggested_price: float


class SEOGenerationRequest(BaseModel):
    title: str
    description: Optional[str] = ""
    keywords: List[str] = Field(default_factory=list)
    language: str = Field(default="en", regex=r"^[a-z]{2}$")


class SEOGenerationResult(BaseModel):
    optimized_title: str
    optimized_description: str
    keywords: List[str]


class ImageGenerationRequest(BaseModel):
    prompt: str
    count: int = Field(default=1, ge=1, le=10)
    aspect_ratio: str = Field(default="1:1")


class GeneratedImage(BaseModel):
    url: str
    prompt: str


class ImageGenerationResult(BaseModel):
    images: List[GeneratedImage]
