# SellZons

SellZons, Amazon, eBay ve Etsy mağazalarınızı tek panelden yönetebilmeniz için tasarlanmış çok dilli bir SaaS örneğidir. İngilizce, Türkçe, Fransızca ve Almanca arayüz desteğiyle toplu ürün yükleme, stok-fiyat güncelleme, AI destekli analiz, SEO metni ve görsel üretimi gibi servisleri tek noktadan sunar.

## Proje yapısı

```
backend/   # FastAPI tabanlı REST servisi
frontend/  # Landing page + yönetim paneli ve AI stüdyosu için statik arayüz
```

## Başlangıç

### Gereksinimler

- Python 3.11+
- Node.js gerekmiyor; arayüz statik dosyalardan oluşur.

### Hızlı önizleme

İki ayrı terminal sekmesi açarak backend API'sini ve statik frontend'i çalıştırabilirsiniz.

1. **Backend**: REST servislerini ayağa kaldırın.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows için .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

2. **Frontend**: Landing page ve kontrol panelini herhangi bir HTTP sunucusu ile servis edin.

```bash
cd frontend
python -m http.server 5173
```

3. **Tarayıcıda önizleyin**: `http://localhost:5173` adresini açın. Arayüz API'ya varsayılan olarak `http://localhost:8000` üzerinden bağlanır. Farklı bir adres kullanacaksanız tarayıcı konsolunda aşağıdaki komutla kalıcı olarak değiştirebilirsiniz:

```js
localStorage.setItem('sellzons-api', 'http://localhost:8001');
```

### Backend'i çalıştırma

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows için .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Varsayılan olarak API `http://localhost:8000` adresinde ayağa kalkar ve SQLite veritabanı proje kökünde `sellzons.db` olarak oluşturulur.

## Öne çıkan özellikler

- **Çok dilli landing page:** EN / TR / FR / DE arasında tek tıkla geçiş yapılabilen premium arayüz.
- **Toplu ürün yükleme & güncelleme:** JSON formatında yüzlerce SKU'yu oluşturun veya güncelleyin.
- **Kanal senkronizasyonu:** Amazon, eBay ve Etsy mock istemcileri üzerinden örnek senkronizasyon akışı.
- **AI ürün analizi:** `/ai/analyze` uç noktası ile stok, fiyat ve açıklamalara göre sağlık skoru ve öneriler üretir.
- **AI SEO metni:** `/ai/seo` uç noktası titre ve açıklama için SEO uyumlu öneriler sağlar.
- **AI görsel konseptleri:** `/ai/images` uç noktası istenen prompt'a göre sahte (placeholder) görsel URL'leri döner.
- **Paketlendirilmiş fiyatlandırma:** Basic, Pro, Plus ve Enterprise paketleri landing page'de gösterilir.

## Geliştirme notları

- Marketplace istemcileri demo amaçlı mock olarak uygulanmıştır. Gerçek entegrasyon için `backend/app/integrations/` altındaki sınıfları ilgili API çağrılarını yapacak şekilde genişletin.
- AI uç noktaları basit kural bazlı çıktılar üretir. Gerçek modeller ile entegre etmek için `backend/app/services.py` içindeki `analyze_product`, `generate_seo_content` ve `generate_images` fonksiyonlarını güncelleyebilirsiniz.
