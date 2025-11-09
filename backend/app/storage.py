import sqlite3
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from typing import Iterable, List, Optional

from .config import settings
from .models import Product, ProductCreate, ProductUpdate

_DB_SCHEMA = """
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL,
    description TEXT,
    channels TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
"""


def init_db() -> None:
    db_path = Path(settings.database_path)
    with sqlite3.connect(db_path) as conn:
        conn.execute(_DB_SCHEMA)
        conn.commit()


@contextmanager
def get_connection():
    db_path = Path(settings.database_path)
    conn = sqlite3.connect(db_path)
    try:
        yield conn
    finally:
        conn.close()


def _row_to_product(row: sqlite3.Row) -> Product:
    return Product(
        id=row[0],
        sku=row[1],
        title=row[2],
        price=row[3],
        stock=row[4],
        description=row[5],
        channels=row[6].split(",") if row[6] else [],
        created_at=datetime.fromisoformat(row[7]),
        updated_at=datetime.fromisoformat(row[8]),
    )


def list_products() -> List[Product]:
    with get_connection() as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute("SELECT * FROM products ORDER BY created_at DESC").fetchall()
        return [_row_to_product(row) for row in rows]


def get_product_by_sku(sku: str) -> Optional[Product]:
    with get_connection() as conn:
        conn.row_factory = sqlite3.Row
        row = conn.execute("SELECT * FROM products WHERE sku = ?", (sku.upper(),)).fetchone()
        return _row_to_product(row) if row else None


def upsert_products(products: Iterable[ProductCreate]) -> int:
    now = datetime.utcnow().isoformat()
    created = 0
    with get_connection() as conn:
        for product in products:
            existing = conn.execute(
                "SELECT id FROM products WHERE sku = ?", (product.sku.upper(),)
            ).fetchone()
            channels = ",".join(product.channels)
            if existing:
                conn.execute(
                    """
                    UPDATE products
                    SET title = ?, price = ?, stock = ?, description = ?, channels = ?, updated_at = ?
                    WHERE sku = ?
                    """,
                    (
                        product.title,
                        product.price,
                        product.stock,
                        product.description,
                        channels,
                        now,
                        product.sku.upper(),
                    ),
                )
            else:
                conn.execute(
                    """
                    INSERT INTO products (sku, title, price, stock, description, channels, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        product.sku.upper(),
                        product.title,
                        product.price,
                        product.stock,
                        product.description,
                        channels,
                        now,
                        now,
                    ),
                )
                created += 1
        conn.commit()
    return created


def bulk_update(updates: Iterable[ProductUpdate]) -> int:
    now = datetime.utcnow().isoformat()
    count = 0
    with get_connection() as conn:
        for update in updates:
            fields = []
            values = []
            if update.price is not None:
                fields.append("price = ?")
                values.append(update.price)
            if update.stock is not None:
                fields.append("stock = ?")
                values.append(update.stock)
            if not fields:
                continue
            values.extend([now, update.sku.upper()])
            result = conn.execute(
                f"UPDATE products SET {', '.join(fields)}, updated_at = ? WHERE sku = ?",
                values,
            )
            count += result.rowcount
        conn.commit()
    return count
