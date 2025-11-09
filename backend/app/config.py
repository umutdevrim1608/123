from pydantic import BaseSettings, Field
from typing import Dict


class Settings(BaseSettings):
    app_name: str = "SellZons API"
    database_path: str = Field(default="sellzons.db", env="SELLZONS_DB")
    integrations: Dict[str, Dict[str, str]] = Field(
        default_factory=lambda: {
            "amazon": {"region": "us-east-1"},
            "ebay": {"site_id": "0"},
            "etsy": {"shop_id": "demo-shop"},
        }
    )


settings = Settings()
