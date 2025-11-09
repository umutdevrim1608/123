const API_BASE = localStorage.getItem('sellzons-api') || 'http://localhost:8000';

const elements = {
  productTableBody: document.getElementById('productTableBody'),
  integrationStatus: document.getElementById('integrationStatus'),
  statusCardTemplate: document.getElementById('statusCardTemplate'),
  logItemTemplate: document.getElementById('logItemTemplate'),
  activityLog: document.getElementById('activityLog'),
  bulkUploadInput: document.getElementById('bulkUploadInput'),
  bulkUploadButton: document.getElementById('bulkUploadButton'),
  bulkUpdateInput: document.getElementById('bulkUpdateInput'),
  bulkUpdateButton: document.getElementById('bulkUpdateButton'),
  syncButton: document.getElementById('syncButton'),
  refreshProductsButton: document.getElementById('refreshProducts'),
  refreshIntegrationsButton: document.getElementById('refreshIntegrations'),
  languageSwitcher: document.getElementById('languageSwitcher'),
  heroMetrics: document.getElementById('heroMetrics'),
  featuresGrid: document.getElementById('featuresGrid'),
  pricingGrid: document.getElementById('pricingGrid'),
  analysisForm: document.getElementById('analysisForm'),
  analysisResult: document.getElementById('analysisResult'),
  seoForm: document.getElementById('seoForm'),
  seoResult: document.getElementById('seoResult'),
  imageForm: document.getElementById('imageForm'),
  imageResult: document.getElementById('imageResult'),
};

const translations = {
  en: {
    brand: 'SellZons',
    nav: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      ai: 'AI Studio',
    },
    hero: {
      eyebrow: 'Global commerce automation',
      title: 'Centralize Amazon, eBay and Etsy growth with premium automation',
      subtitle:
        'SellZons unifies catalogue uploads, live stock & pricing, and AI-assisted optimisation in one elegant workspace built for international teams.',
      ctaPrimary: 'Explore plans',
      ctaSecondary: 'Go to dashboard',
      metrics: [
        { value: '3', label: 'Connected marketplaces' },
        { value: '15+', label: 'Automation recipes' },
        { value: '4', label: 'Active languages' },
      ],
    },
    features: {
      title: 'All-in-one marketplace operating system',
      subtitle: 'Designed for global scale with multilingual workflows and AI copilots.',
      items: [
        {
          icon: 'upload',
          title: 'Bulk upload engine',
          description: 'Launch or update hundreds of SKUs with schema validation and channel routing.',
        },
        {
          icon: 'sync',
          title: 'Real-time stock & price',
          description: 'Keep inventory balanced automatically across Amazon, eBay and Etsy.',
        },
        {
          icon: 'ai',
          title: 'AI product intelligence',
          description: 'Let AI review listings, suggest pricing and uncover opportunities instantly.',
        },
        {
          icon: 'seo',
          title: 'SEO-perfect listings',
          description: 'Generate titles & descriptions tuned for each marketplace and language.',
        },
        {
          icon: 'image',
          title: 'AI visuals',
          description: 'Create studio-grade image concepts with adjustable ratios for every channel.',
        },
        {
          icon: 'global',
          title: 'Global ready',
          description: 'Interface available in English, Türkçe, Français and Deutsch with unified analytics.',
        },
      ],
    },
    pricing: {
      title: 'Plans built for every stage',
      subtitle: 'Scale confidently with flexible AI credits.',
      plans: [
        {
          name: 'Basic',
          price: '$79',
          period: 'monthly',
          description: 'Perfect for new marketplace sellers centralising their first catalogue.',
          bullets: [
            '100 products listed & monitored each month',
            '5 AI image concepts included',
            'Live stock & price sync across channels',
          ],
        },
        {
          name: 'Pro',
          price: '$99',
          period: 'monthly',
          description: 'Accelerate growth with richer automation and generous image credits.',
          bullets: [
            '250 products listed & monitored each month',
            '10 AI image concepts included',
            'Priority integration refresh windows',
          ],
        },
        {
          name: 'Plus',
          price: '$119',
          period: 'monthly',
          description: 'Unlock full AI capabilities and deeper optimisation insights.',
          bullets: [
            '500 products listed & monitored each month',
            '20 AI image concepts included',
            'Access to AI analysis, SEO and visual studio',
          ],
        },
      ],
      enterpriseTitle: 'Enterprise',
      enterpriseSubtitle:
        'Custom catalog operations, unlimited marketplaces and dedicated success teams.',
      enterpriseCTA: 'Contact us',
    },
    dashboard: {
      title: 'Operate every marketplace from a single control center',
      subtitle: 'Monitor integrations, launch bulk updates and stay on top of catalogue performance.',
      integrations: {
        title: 'Integration status',
        refresh: 'Refresh',
        ready: 'Ready',
        neverSynced: 'No sync yet',
        lastSynced: 'Last sync: {time}',
      },
      sync: {
        title: 'Global sync',
        subtitle: 'Push catalogue updates instantly across Amazon, eBay and Etsy.',
        button: 'Sync all channels',
        running: 'Syncing…',
      },
      activity: {
        title: 'Activity log',
      },
      products: {
        title: 'Product catalogue',
        refresh: 'Refresh',
        empty: 'No products yet.',
        headers: {
          sku: 'SKU',
          title: 'Product',
          price: 'Price',
          stock: 'Stock',
          channels: 'Channels',
          updated: 'Updated',
        },
      },
      bulkUpload: {
        title: 'Bulk product upload',
        subtitle: 'Paste an array of products that match our schema. Existing SKUs will be updated automatically.',
        placeholder:
          '[\n  {"sku": "SKU-1001", "title": "Product", "price": 99.9, "stock": 10, "description": "Description", "channels": ["amazon", "etsy"]}\n]',
        button: 'Start upload',
      },
      bulkUpdate: {
        title: 'Bulk stock & price update',
        subtitle: 'Provide SKU targets with price or stock adjustments to broadcast across channels.',
        placeholder:
          '[\n  {"sku": "SKU-1001", "price": 89.9},\n  {"sku": "SKU-1002", "stock": 25}\n]',
        button: 'Apply update',
      },
    },
    ai: {
      title: 'AI studio',
      subtitle: 'Optimise your catalogue with instant product diagnostics, SEO-ready listings and concept visuals.',
      analysis: {
        title: 'AI product analysis',
        fields: {
          title: 'Product name',
          description: 'Description',
          price: 'Price',
          stock: 'Stock',
          category: 'Category',
        },
        button: 'Run analysis',
        recommendationsMap: {
          'Extend the description to highlight unique benefits and keywords.':
            'Extend the description to highlight unique benefits and keywords.',
          'Increase stock to avoid missing out on high demand.':
            'Increase stock to avoid missing out on high demand.',
          'Consider testing promotional pricing to improve conversion.':
            'Consider testing promotional pricing to improve conversion.',
          'Add a clear category to improve marketplace discovery.':
            'Add a clear category to improve marketplace discovery.',
          'Keep monitoring performance to discover optimisation opportunities.':
            'Keep monitoring performance to discover optimisation opportunities.',
        },
        result: {
          title: 'Insights',
          score: 'Health score',
          demand: 'Demand',
          suggestions: 'Recommendations',
          suggestedPrice: 'Suggested price',
        },
      },
      seo: {
        title: 'AI SEO title & description',
        fields: {
          title: 'Base title',
          description: 'Product description',
          keywords: 'Keywords (comma separated)',
          language: 'Language',
        },
        button: 'Generate copy',
        result: {
          title: 'Optimised listing',
          generatedTitle: 'Title',
          generatedDescription: 'Description',
          keywords: 'Keywords',
        },
      },
      images: {
        title: 'AI image concepts',
        fields: {
          prompt: 'Prompt',
          count: 'Image count',
          ratio: 'Aspect ratio',
        },
        button: 'Generate concepts',
        result: {
          title: 'Concepts',
          empty: 'No images generated yet.',
        },
      },
    },
    footer: {
      tagline: 'Premium marketplace automation built for global brands.',
      contact: 'Contact',
      pricing: 'Pricing',
    },
    logs: {
      productsLoaded: 'Product list refreshed',
      productsFailed: 'Products could not be loaded',
      integrationsLoaded: 'Integration statuses refreshed',
      integrationsFailed: 'Integration status failed',
      uploadSuccess: 'Bulk upload finished: {created} new / {updated} updated',
      uploadError: 'Bulk upload failed',
      updateSuccess: 'Bulk update finished: {updated} items updated',
      updateError: 'Bulk update failed',
      syncChannel: '{channel} synchronised {count} products',
      syncError: 'Global sync failed',
      analysisSuccess: 'AI product analysis completed',
      analysisError: 'AI product analysis failed',
      seoSuccess: 'AI SEO copy generated',
      seoError: 'AI SEO generation failed',
      imageSuccess: 'AI image concepts generated',
      imageError: 'AI image generation failed',
    },
    errors: {
      invalidJSON: 'Invalid JSON',
      requestFailed: 'Request failed',
    },
    demandLevels: {
      high: 'High demand',
      medium: 'Steady demand',
      low: 'Niche demand',
    },
  },
  tr: {
    brand: 'SellZons',
    nav: {
      home: 'Ana Sayfa',
      features: 'Özellikler',
      pricing: 'Paketler',
      dashboard: 'Kontrol Paneli',
      ai: 'Yapay Zeka Stüdyosu',
    },
    hero: {
      eyebrow: 'Küresel ticaret otomasyonu',
      title: 'Amazon, eBay ve Etsy büyümenizi premium otomasyonla merkezileştirin',
      subtitle:
        'SellZons; toplu ürün yükleme, canlı stok & fiyat yönetimi ve yapay zeka destekli optimizasyonu uluslararası ekipler için tek bir arayüzde toplar.',
      ctaPrimary: 'Paketleri keşfet',
      ctaSecondary: 'Kontrol paneline git',
      metrics: [
        { value: '3', label: 'Bağlı pazar yerleri' },
        { value: '15+', label: 'Otomasyon senaryosu' },
        { value: '4', label: 'Aktif dil' },
      ],
    },
    features: {
      title: 'Tümleşik pazar yeri işletim sistemi',
      subtitle: 'Çok dilli iş akışları ve yapay zeka asistanlarıyla küresel ölçek için tasarlandı.',
      items: [
        {
          icon: 'upload',
          title: 'Toplu yükleme motoru',
          description: 'Yüzlerce SKU’yu şema doğrulaması ve kanal yönlendirmesiyle hızla yayınlayın veya güncelleyin.',
        },
        {
          icon: 'sync',
          title: 'Anlık stok & fiyat',
          description: 'Amazon, eBay ve Etsy arasında envanteri otomatik olarak dengede tutun.',
        },
        {
          icon: 'ai',
          title: 'Yapay zeka ürün zekası',
          description: 'Yapay zeka listeleri inceler, fiyat önerir ve fırsatları anında ortaya çıkarır.',
        },
        {
          icon: 'seo',
          title: 'SEO uyumlu içerik',
          description: 'Her pazar yeri ve dil için optimize başlık ve açıklamalar üretin.',
        },
        {
          icon: 'image',
          title: 'Yapay zeka görselleri',
          description: 'Her kanal için uyarlanabilir oranlarda stüdyo kalitesinde görsel konseptleri oluşturun.',
        },
        {
          icon: 'global',
          title: 'Küresel hazır',
          description: 'Arayüz İngilizce, Türkçe, Fransızca ve Almanca dillerinde birleşik analizlerle sunulur.',
        },
      ],
    },
    pricing: {
      title: 'Her ölçek için paketler',
      subtitle: 'Esnek yapay zeka kredileriyle güvenle büyüyün.',
      plans: [
        {
          name: 'Basic',
          price: '$79',
          period: 'aylık',
          description: 'İlk kataloğunu merkezileştiren yeni satıcılar için ideal.',
          bullets: [
            'Aylık 100 ürün listeleme ve takip',
            '5 adet yapay zeka görsel konsepti',
            'Kanallar arası canlı stok & fiyat senkronu',
          ],
        },
        {
          name: 'Pro',
          price: '$99',
          period: 'aylık',
          description: 'Daha zengin otomasyon ve ekstra görsel kredileriyle büyümeyi hızlandırın.',
          bullets: [
            'Aylık 250 ürün yükleme ve takip',
            '10 adet yapay zeka görsel konsepti',
            'Öncelikli entegrasyon yenileme pencereleri',
          ],
        },
        {
          name: 'Plus',
          price: '$119',
          period: 'aylık',
          description: 'Tam yapay zeka yeteneklerini ve derin optimizasyon içgörülerini açığa çıkarın.',
          bullets: [
            'Aylık 500 ürün yükleme ve takip',
            '20 adet yapay zeka görsel konsepti',
            'Yapay zeka analiz, SEO ve görsel stüdyo erişimi',
          ],
        },
      ],
      enterpriseTitle: 'Enterprise',
      enterpriseSubtitle: 'Özel katalog operasyonları, sınırsız pazar yeri ve dedike başarı ekipleri.',
      enterpriseCTA: 'Bize ulaşın',
    },
    dashboard: {
      title: 'Tüm pazar yerlerini tek merkezden yönetin',
      subtitle: 'Entegrasyonları izleyin, toplu güncellemeleri başlatın ve kataloğu kontrol altında tutun.',
      integrations: {
        title: 'Entegrasyon durumu',
        refresh: 'Yenile',
        ready: 'Hazır',
        neverSynced: 'Henüz senkron yok',
        lastSynced: 'Son senkron: {time}',
      },
      sync: {
        title: 'Global senkron',
        subtitle: 'Güncellemeleri Amazon, eBay ve Etsy’ye anında iletin.',
        button: 'Tüm kanalları senkronize et',
        running: 'Senkronize ediliyor…',
      },
      activity: {
        title: 'Aktivite kaydı',
      },
      products: {
        title: 'Ürün kataloğu',
        refresh: 'Yenile',
        empty: 'Henüz ürün bulunmuyor.',
        headers: {
          sku: 'SKU',
          title: 'Ürün',
          price: 'Fiyat',
          stock: 'Stok',
          channels: 'Kanallar',
          updated: 'Güncellendi',
        },
      },
      bulkUpload: {
        title: 'Toplu ürün yükleme',
        subtitle: 'Şemamıza uyan ürün dizisini yapıştırın. Aynı SKU otomatik güncellenir.',
        placeholder:
          '[\n  {"sku": "SKU-1001", "title": "Ürün", "price": 99.9, "stock": 10, "description": "Açıklama", "channels": ["amazon", "etsy"]}\n]',
        button: 'Yüklemeyi başlat',
      },
      bulkUpdate: {
        title: 'Toplu stok & fiyat güncelleme',
        subtitle: 'Kanallar arasında iletilecek fiyat veya stok güncellemelerini belirtin.',
        placeholder:
          '[\n  {"sku": "SKU-1001", "price": 89.9},\n  {"sku": "SKU-1002", "stock": 25}\n]',
        button: 'Güncellemeyi uygula',
      },
    },
    ai: {
      title: 'Yapay zeka stüdyosu',
      subtitle: 'Ürün analizi, SEO uyumlu içerik ve görsel konseptlerle kataloğunuzu optimize edin.',
      analysis: {
        title: 'Yapay zeka ürün analizi',
        fields: {
          title: 'Ürün adı',
          description: 'Açıklama',
          price: 'Fiyat',
          stock: 'Stok',
          category: 'Kategori',
        },
        button: 'Analiz et',
        recommendationsMap: {
          'Extend the description to highlight unique benefits and keywords.':
            'Benzersiz faydaları ve anahtar kelimeleri vurgulamak için açıklamayı genişletin.',
          'Increase stock to avoid missing out on high demand.':
            'Yüksek talebi kaçırmamak için stoğu artırın.',
          'Consider testing promotional pricing to improve conversion.':
            'Dönüşümü artırmak için promosyon fiyatlamasını test edin.',
          'Add a clear category to improve marketplace discovery.':
            'Pazaryeri keşfini güçlendirmek için net bir kategori ekleyin.',
          'Keep monitoring performance to discover optimisation opportunities.':
            'Optimizasyon fırsatlarını yakalamak için performansı izlemeye devam edin.',
        },
        result: {
          title: 'İçgörüler',
          score: 'Sağlık skoru',
          demand: 'Talep',
          suggestions: 'Öneriler',
          suggestedPrice: 'Önerilen fiyat',
        },
      },
      seo: {
        title: 'Yapay zeka SEO başlık & açıklama',
        fields: {
          title: 'Temel başlık',
          description: 'Ürün açıklaması',
          keywords: 'Anahtar kelimeler (virgülle)',
          language: 'Dil',
        },
        button: 'Metin oluştur',
        result: {
          title: 'Optimize liste',
          generatedTitle: 'Başlık',
          generatedDescription: 'Açıklama',
          keywords: 'Anahtar kelimeler',
        },
      },
      images: {
        title: 'Yapay zeka görsel konseptleri',
        fields: {
          prompt: 'Komut',
          count: 'Görsel adedi',
          ratio: 'En-boy oranı',
        },
        button: 'Konsept üret',
        result: {
          title: 'Konseptler',
          empty: 'Henüz görsel oluşturulmadı.',
        },
      },
    },
    footer: {
      tagline: 'Küresel markalar için premium pazar yeri otomasyonu.',
      contact: 'İletişim',
      pricing: 'Paketler',
    },
    logs: {
      productsLoaded: 'Ürün listesi güncellendi',
      productsFailed: 'Ürünler alınamadı',
      integrationsLoaded: 'Entegrasyonlar yenilendi',
      integrationsFailed: 'Entegrasyon durumu alınamadı',
      uploadSuccess: 'Toplu yükleme tamamlandı: {created} yeni / {updated} güncellendi',
      uploadError: 'Toplu yükleme başarısız',
      updateSuccess: 'Toplu güncelleme tamamlandı: {updated} ürün güncellendi',
      updateError: 'Toplu güncelleme başarısız',
      syncChannel: '{channel} kanalı {count} ürünü senkronize etti',
      syncError: 'Global senkron başarısız',
      analysisSuccess: 'Yapay zeka ürün analizi tamamlandı',
      analysisError: 'Yapay zeka ürün analizi başarısız',
      seoSuccess: 'Yapay zeka SEO içeriği üretildi',
      seoError: 'Yapay zeka SEO üretimi başarısız',
      imageSuccess: 'Yapay zeka görsel konseptleri hazır',
      imageError: 'Yapay zeka görsel üretimi başarısız',
    },
    errors: {
      invalidJSON: 'Geçersiz JSON',
      requestFailed: 'İstek başarısız',
    },
    demandLevels: {
      high: 'Yüksek talep',
      medium: 'Dengeli talep',
      low: 'Niş talep',
    },
  },
  fr: {
    brand: 'SellZons',
    nav: {
      home: 'Accueil',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      dashboard: 'Tableau de bord',
      ai: 'Studio IA',
    },
    hero: {
      eyebrow: 'Automatisation du commerce mondial',
      title: 'Centralisez votre croissance Amazon, eBay et Etsy avec une automatisation premium',
      subtitle:
        "SellZons unifie les imports de catalogue, la gestion du stock & des prix en direct et l'optimisation assistée par IA dans un espace élégant pour les équipes internationales.",
      ctaPrimary: 'Découvrir les offres',
      ctaSecondary: 'Aller au tableau de bord',
      metrics: [
        { value: '3', label: 'Places de marché connectées' },
        { value: '15+', label: "Recettes d'automatisation" },
        { value: '4', label: 'Langues actives' },
      ],
    },
    features: {
      title: 'Système opératoire marketplace tout-en-un',
      subtitle: 'Conçu pour l’échelle mondiale avec des flux multilingues et des copilotes IA.',
      items: [
        {
          icon: 'upload',
          title: 'Moteur d’import massif',
          description: 'Publiez ou mettez à jour des centaines de SKU avec validation de schéma et routage par canal.',
        },
        {
          icon: 'sync',
          title: 'Stock & prix en temps réel',
          description: 'Maintenez automatiquement l’équilibre des stocks entre Amazon, eBay et Etsy.',
        },
        {
          icon: 'ai',
          title: 'Intelligence produit IA',
          description: 'L’IA audite les fiches, suggère des prix et révèle instantanément des opportunités.',
        },
        {
          icon: 'seo',
          title: 'Fiches parfaites SEO',
          description: 'Générez titres et descriptions optimisés pour chaque marketplace et chaque langue.',
        },
        {
          icon: 'image',
          title: 'Visuels IA',
          description: 'Créez des concepts d’images dignes d’un studio avec ratios ajustables pour chaque canal.',
        },
        {
          icon: 'global',
          title: 'Prêt pour le monde',
          description: 'Interface disponible en anglais, turc, français et allemand avec analyses unifiées.',
        },
      ],
    },
    pricing: {
      title: 'Des offres pour chaque étape',
      subtitle: 'Développez-vous sereinement avec des crédits IA flexibles.',
      plans: [
        {
          name: 'Basic',
          price: '79 $',
          period: 'mensuel',
          description: 'Idéal pour les vendeurs qui centralisent leur premier catalogue.',
          bullets: [
            '100 produits listés et suivis par mois',
            '5 concepts visuels IA inclus',
            'Synchronisation stock & prix en direct',
          ],
        },
        {
          name: 'Pro',
          price: '99 $',
          period: 'mensuel',
          description: 'Accélérez la croissance avec plus d’automatisation et de crédits visuels.',
          bullets: [
            '250 produits listés et suivis par mois',
            '10 concepts visuels IA inclus',
            'Fenêtres de synchronisation prioritaires',
          ],
        },
        {
          name: 'Plus',
          price: '119 $',
          period: 'mensuel',
          description: 'Débloquez la puissance IA complète et des insights d’optimisation avancés.',
          bullets: [
            '500 produits listés et suivis par mois',
            '20 concepts visuels IA inclus',
            'Accès au studio IA : analyse, SEO, visuels',
          ],
        },
      ],
      enterpriseTitle: 'Enterprise',
      enterpriseSubtitle: 'Opérations catalogue sur mesure, marketplaces illimitées et équipe dédiée.',
      enterpriseCTA: 'Nous contacter',
    },
    dashboard: {
      title: 'Pilotez chaque marketplace depuis un centre unique',
      subtitle: 'Surveillez les intégrations, lancez des mises à jour massives et gardez la maîtrise du catalogue.',
      integrations: {
        title: 'Statut des intégrations',
        refresh: 'Actualiser',
        ready: 'Prêt',
        neverSynced: 'Pas encore de synchronisation',
        lastSynced: 'Dernière synchro : {time}',
      },
      sync: {
        title: 'Synchronisation globale',
        subtitle: 'Diffusez instantanément vos mises à jour sur Amazon, eBay et Etsy.',
        button: 'Synchroniser tous les canaux',
        running: 'Synchronisation…',
      },
      activity: {
        title: 'Journal d’activité',
      },
      products: {
        title: 'Catalogue produit',
        refresh: 'Actualiser',
        empty: 'Aucun produit pour le moment.',
        headers: {
          sku: 'SKU',
          title: 'Produit',
          price: 'Prix',
          stock: 'Stock',
          channels: 'Canaux',
          updated: 'Mis à jour',
        },
      },
      bulkUpload: {
        title: 'Import produit massif',
        subtitle: 'Collez un tableau de produits conforme au schéma. Les SKU existants seront mis à jour.',
        placeholder:
          '[\n  {"sku": "SKU-1001", "title": "Produit", "price": 99.9, "stock": 10, "description": "Description", "channels": ["amazon", "etsy"]}\n]',
        button: 'Lancer l’import',
      },
      bulkUpdate: {
        title: 'Mise à jour stock & prix',
        subtitle: 'Indiquez les SKU avec les ajustements de prix ou de stock à diffuser.',
        placeholder:
          '[\n  {"sku": "SKU-1001", "price": 89.9},\n  {"sku": "SKU-1002", "stock": 25}\n]',
        button: 'Appliquer',
      },
    },
    ai: {
      title: 'Studio IA',
      subtitle: 'Optimisez votre catalogue avec diagnostics, contenus SEO et visuels générés instantanément.',
      analysis: {
        title: 'Analyse produit IA',
        fields: {
          title: 'Nom du produit',
          description: 'Description',
          price: 'Prix',
          stock: 'Stock',
          category: 'Catégorie',
        },
        button: 'Analyser',
        recommendationsMap: {
          'Extend the description to highlight unique benefits and keywords.':
            'Allongez la description pour mettre en avant les bénéfices uniques et les mots-clés.',
          'Increase stock to avoid missing out on high demand.':
            'Augmentez le stock pour ne pas manquer la forte demande.',
          'Consider testing promotional pricing to improve conversion.':
            'Testez un prix promotionnel pour améliorer la conversion.',
          'Add a clear category to improve marketplace discovery.':
            'Ajoutez une catégorie claire pour améliorer la découverte sur les marketplaces.',
          'Keep monitoring performance to discover optimisation opportunities.':
            'Continuez de surveiller les performances pour détecter des optimisations.',
        },
        result: {
          title: 'Insights',
          score: 'Score santé',
          demand: 'Demande',
          suggestions: 'Recommandations',
          suggestedPrice: 'Prix suggéré',
        },
      },
      seo: {
        title: 'Titre & description SEO IA',
        fields: {
          title: 'Titre de base',
          description: 'Description produit',
          keywords: 'Mots-clés (séparés par des virgules)',
          language: 'Langue',
        },
        button: 'Générer le contenu',
        result: {
          title: 'Fiche optimisée',
          generatedTitle: 'Titre',
          generatedDescription: 'Description',
          keywords: 'Mots-clés',
        },
      },
      images: {
        title: 'Concepts visuels IA',
        fields: {
          prompt: 'Prompt',
          count: 'Nombre d’images',
          ratio: 'Ratio',
        },
        button: 'Générer des concepts',
        result: {
          title: 'Concepts',
          empty: 'Aucun visuel généré pour le moment.',
        },
      },
    },
    footer: {
      tagline: 'Automatisation marketplace premium pour marques internationales.',
      contact: 'Contact',
      pricing: 'Tarifs',
    },
    logs: {
      productsLoaded: 'Catalogue mis à jour',
      productsFailed: 'Échec du chargement du catalogue',
      integrationsLoaded: 'Statuts d’intégration mis à jour',
      integrationsFailed: "Impossible de charger l'état des intégrations",
      uploadSuccess: 'Import massif terminé : {created} nouveaux / {updated} mis à jour',
      uploadError: "Échec de l'import massif",
      updateSuccess: 'Mise à jour massive : {updated} produits',
      updateError: 'Échec de la mise à jour massive',
      syncChannel: '{channel} a synchronisé {count} produits',
      syncError: 'Échec de la synchronisation globale',
      analysisSuccess: 'Analyse produit IA terminée',
      analysisError: 'Échec de l’analyse IA',
      seoSuccess: 'Contenu SEO IA généré',
      seoError: 'Échec de la génération SEO IA',
      imageSuccess: 'Concepts visuels IA générés',
      imageError: 'Échec de la génération visuelle IA',
    },
    errors: {
      invalidJSON: 'JSON invalide',
      requestFailed: 'La requête a échoué',
    },
    demandLevels: {
      high: 'Forte demande',
      medium: 'Demande stable',
      low: 'Demande de niche',
    },
  },
  de: {
    brand: 'SellZons',
    nav: {
      home: 'Start',
      features: 'Funktionen',
      pricing: 'Preise',
      dashboard: 'Dashboard',
      ai: 'KI-Studio',
    },
    hero: {
      eyebrow: 'Globale Commerce-Automatisierung',
      title: 'Skalieren Sie Amazon-, eBay- und Etsy-Verkäufe mit Premium-Automatisierung',
      subtitle:
        'SellZons vereint Katalogimporte, Live-Bestand & Preissteuerung sowie KI-Optimierung in einer eleganten Oberfläche für internationale Teams.',
      ctaPrimary: 'Pläne ansehen',
      ctaSecondary: 'Zum Dashboard',
      metrics: [
        { value: '3', label: 'Verbundene Marktplätze' },
        { value: '15+', label: 'Automatisierungs-Workflows' },
        { value: '4', label: 'Aktive Sprachen' },
      ],
    },
    features: {
      title: 'All-in-One Betriebssystem für Marktplätze',
      subtitle: 'Für globale Skalierung mit mehrsprachigen Workflows und KI-Co-Piloten entwickelt.',
      items: [
        {
          icon: 'upload',
          title: 'Bulk-Upload-Engine',
          description: 'Veröffentlichen oder aktualisieren Sie hunderte SKUs mit Schema-Prüfung und Kanalrouting.',
        },
        {
          icon: 'sync',
          title: 'Echtzeit-Bestand & Preise',
          description: 'Halten Sie Bestände zwischen Amazon, eBay und Etsy automatisch im Gleichgewicht.',
        },
        {
          icon: 'ai',
          title: 'KI-Produktintelligenz',
          description: 'KI prüft Listings, schlägt Preise vor und entdeckt Chancen sofort.',
        },
        {
          icon: 'seo',
          title: 'SEO-optimierte Listings',
          description: 'Erzeugen Sie Titel und Beschreibungen für jeden Marktplatz und jede Sprache.',
        },
        {
          icon: 'image',
          title: 'KI-Visuals',
          description: 'Erstellen Sie Studio-konforme Bildkonzepte mit variablen Seitenverhältnissen.',
        },
        {
          icon: 'global',
          title: 'Global bereit',
          description: 'Oberfläche auf Englisch, Türkisch, Französisch und Deutsch mit einheitlicher Analyse.',
        },
      ],
    },
    pricing: {
      title: 'Pakete für jede Phase',
      subtitle: 'Wachsen Sie sicher mit flexiblen KI-Credits.',
      plans: [
        {
          name: 'Basic',
          price: '$79',
          period: 'monatlich',
          description: 'Perfekt für Händler, die ihren ersten Katalog zentralisieren.',
          bullets: [
            '100 Produkte pro Monat gelistet & überwacht',
            '5 KI-Bildkonzepte inklusive',
            'Live-Bestand & Preis-Sync über alle Kanäle',
          ],
        },
        {
          name: 'Pro',
          price: '$99',
          period: 'monatlich',
          description: 'Beschleunigen Sie Wachstum mit mehr Automatisierung und Bild-Credits.',
          bullets: [
            '250 Produkte pro Monat gelistet & überwacht',
            '10 KI-Bildkonzepte inklusive',
            'Priorisierte Integrations-Updates',
          ],
        },
        {
          name: 'Plus',
          price: '$119',
          period: 'monatlich',
          description: 'Schalten Sie komplette KI-Funktionen und tiefere Insights frei.',
          bullets: [
            '500 Produkte pro Monat gelistet & überwacht',
            '20 KI-Bildkonzepte inklusive',
            'Zugang zu KI-Analyse, SEO und Visual Studio',
          ],
        },
      ],
      enterpriseTitle: 'Enterprise',
      enterpriseSubtitle: 'Individuelle Katalogprozesse, unbegrenzte Marktplätze, dediziertes Team.',
      enterpriseCTA: 'Kontakt aufnehmen',
    },
    dashboard: {
      title: 'Steuern Sie alle Marktplätze aus einem Kontrollzentrum',
      subtitle: 'Überwachen Sie Integrationen, starten Sie Bulk-Updates und behalten Sie den Katalog im Blick.',
      integrations: {
        title: 'Integrationsstatus',
        refresh: 'Aktualisieren',
        ready: 'Bereit',
        neverSynced: 'Noch keine Synchronisierung',
        lastSynced: 'Letzte Synchronisierung: {time}',
      },
      sync: {
        title: 'Globale Synchronisierung',
        subtitle: 'Übertragen Sie Aktualisierungen sofort zu Amazon, eBay und Etsy.',
        button: 'Alle Kanäle synchronisieren',
        running: 'Synchronisiere…',
      },
      activity: {
        title: 'Aktivitätsprotokoll',
      },
      products: {
        title: 'Produktkatalog',
        refresh: 'Aktualisieren',
        empty: 'Noch keine Produkte.',
        headers: {
          sku: 'SKU',
          title: 'Produkt',
          price: 'Preis',
          stock: 'Bestand',
          channels: 'Kanäle',
          updated: 'Aktualisiert',
        },
      },
      bulkUpload: {
        title: 'Bulk-Produkt-Upload',
        subtitle: 'Fügen Sie ein Array konformer Produkte ein. Bestehende SKUs werden aktualisiert.',
        placeholder:
          '[\n  {"sku": "SKU-1001", "title": "Produkt", "price": 99.9, "stock": 10, "description": "Beschreibung", "channels": ["amazon", "etsy"]}\n]',
        button: 'Upload starten',
      },
      bulkUpdate: {
        title: 'Bulk-Bestand & Preisupdate',
        subtitle: 'Geben Sie SKU-Ziele mit Preis- oder Bestandsanpassungen an.',
        placeholder:
          '[\n  {"sku": "SKU-1001", "price": 89.9},\n  {"sku": "SKU-1002", "stock": 25}\n]',
        button: 'Update anwenden',
      },
    },
    ai: {
      title: 'KI-Studio',
      subtitle: 'Optimieren Sie Ihren Katalog mit Analysen, SEO-Texten und Visuals in Sekunden.',
      analysis: {
        title: 'KI-Produktanalyse',
        fields: {
          title: 'Produktname',
          description: 'Beschreibung',
          price: 'Preis',
          stock: 'Bestand',
          category: 'Kategorie',
        },
        button: 'Analyse starten',
        recommendationsMap: {
          'Extend the description to highlight unique benefits and keywords.':
            'Erweitern Sie die Beschreibung, um Vorteile und Keywords hervorzuheben.',
          'Increase stock to avoid missing out on high demand.':
            'Erhöhen Sie den Bestand, um hohe Nachfrage nicht zu verpassen.',
          'Consider testing promotional pricing to improve conversion.':
            'Testen Sie Aktionspreise, um die Conversion zu steigern.',
          'Add a clear category to improve marketplace discovery.':
            'Fügen Sie eine klare Kategorie hinzu, um die Auffindbarkeit zu verbessern.',
          'Keep monitoring performance to discover optimisation opportunities.':
            'Überwachen Sie die Performance weiter, um Optimierungschancen zu erkennen.',
        },
        result: {
          title: 'Insights',
          score: 'Gesundheits-Score',
          demand: 'Nachfrage',
          suggestions: 'Empfehlungen',
          suggestedPrice: 'Vorgeschlagener Preis',
        },
      },
      seo: {
        title: 'KI-SEO-Titel & Beschreibung',
        fields: {
          title: 'Basis-Titel',
          description: 'Produktbeschreibung',
          keywords: 'Keywords (Komma-getrennt)',
          language: 'Sprache',
        },
        button: 'Text generieren',
        result: {
          title: 'Optimiertes Listing',
          generatedTitle: 'Titel',
          generatedDescription: 'Beschreibung',
          keywords: 'Keywords',
        },
      },
      images: {
        title: 'KI-Bildkonzepte',
        fields: {
          prompt: 'Prompt',
          count: 'Anzahl Bilder',
          ratio: 'Seitenverhältnis',
        },
        button: 'Konzepte erzeugen',
        result: {
          title: 'Konzepte',
          empty: 'Noch keine Bilder generiert.',
        },
      },
    },
    footer: {
      tagline: 'Premium-Marktplatz-Automatisierung für globale Marken.',
      contact: 'Kontakt',
      pricing: 'Preise',
    },
    logs: {
      productsLoaded: 'Produktliste aktualisiert',
      productsFailed: 'Produkte konnten nicht geladen werden',
      integrationsLoaded: 'Integrationsstatus aktualisiert',
      integrationsFailed: 'Integrationsstatus fehlgeschlagen',
      uploadSuccess: 'Bulk-Upload abgeschlossen: {created} neu / {updated} aktualisiert',
      uploadError: 'Bulk-Upload fehlgeschlagen',
      updateSuccess: 'Bulk-Update abgeschlossen: {updated} Produkte aktualisiert',
      updateError: 'Bulk-Update fehlgeschlagen',
      syncChannel: '{channel} synchronisierte {count} Produkte',
      syncError: 'Globale Synchronisierung fehlgeschlagen',
      analysisSuccess: 'KI-Analyse abgeschlossen',
      analysisError: 'KI-Analyse fehlgeschlagen',
      seoSuccess: 'KI-SEO-Text generiert',
      seoError: 'KI-SEO-Generierung fehlgeschlagen',
      imageSuccess: 'KI-Bildkonzepte generiert',
      imageError: 'KI-Bildgenerierung fehlgeschlagen',
    },
    errors: {
      invalidJSON: 'Ungültiges JSON',
      requestFailed: 'Anfrage fehlgeschlagen',
    },
    demandLevels: {
      high: 'Hohe Nachfrage',
      medium: 'Stetige Nachfrage',
      low: 'Nischen-Nachfrage',
    },
  },
};

const state = {
  lang: 'en',
  products: [],
  integrations: [],
  analysis: null,
  seo: null,
  images: null,
};

function getTranslation(lang, path) {
  const segments = path.split('.');
  let current = translations[lang];
  for (const segment of segments) {
    if (!current || typeof current !== 'object' || !(segment in current)) {
      return undefined;
    }
    current = current[segment];
  }
  return current;
}

function t(path, replacements = {}) {
  const value =
    getTranslation(state.lang, path) ?? getTranslation('en', path) ?? `[[${path}]]`;
  if (typeof value !== 'string') {
    return value;
  }
  return value.replace(/\{(\w+)\}/g, (_, key) => String(replacements[key] ?? `{${key}}`));
}

function applyTranslations() {
  document.documentElement.lang = state.lang;
  document
    .querySelectorAll('[data-i18n]')
    .forEach((node) => {
      const key = node.dataset.i18n;
      const value = t(key);
      if (typeof value === 'string') {
        node.textContent = value;
      }
    });

  document
    .querySelectorAll('[data-i18n-placeholder]')
    .forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      const value = t(key);
      if (typeof value === 'string') {
        node.placeholder = value;
      }
    });

  renderHeroMetrics();
  renderFeatures();
  renderPricing();
  renderProducts(state.products);
  renderIntegrationStatus(state.integrations);
  if (state.analysis) {
    renderAnalysisResult(state.analysis);
  }
  if (state.seo) {
    renderSEOResult(state.seo);
  }
  if (state.images) {
    renderImageResult(state.images);
  }
}

function renderHeroMetrics() {
  elements.heroMetrics.innerHTML = '';
  const metrics = t('hero.metrics');
  if (Array.isArray(metrics)) {
    for (const metric of metrics) {
      const metricNode = document.createElement('div');
      metricNode.className = 'hero-metric';
      metricNode.innerHTML = `<span class="metric-value">${metric.value}</span><span class="metric-label">${metric.label}</span>`;
      elements.heroMetrics.appendChild(metricNode);
    }
  }
}

function renderFeatures() {
  elements.featuresGrid.innerHTML = '';
  const items = t('features.items');
  if (!Array.isArray(items)) return;
  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'feature-card';
    card.innerHTML = `
      <div class="feature-icon ${item.icon}"></div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    elements.featuresGrid.appendChild(card);
  }
}

function renderPricing() {
  elements.pricingGrid.innerHTML = '';
  const plans = t('pricing.plans');
  if (!Array.isArray(plans)) return;
  for (const plan of plans) {
    const card = document.createElement('article');
    card.className = 'pricing-card';
    card.innerHTML = `
      <div class="pricing-header">
        <h3>${plan.name}</h3>
        <p class="price">${plan.price}<span> / ${plan.period}</span></p>
      </div>
      <p class="plan-description">${plan.description}</p>
      <ul class="plan-list">${plan.bullets
        .map((item) => `<li>${item}</li>`)
        .join('')}</ul>
      <button class="ghost-button" type="button">${t('hero.ctaPrimary')}</button>
    `;
    elements.pricingGrid.appendChild(card);
  }
}

function logActivity(message, detail) {
  const node = elements.logItemTemplate.content.cloneNode(true);
  node.querySelector('.log-title').textContent = message;
  node.querySelector('.log-time').textContent = detail || new Date().toLocaleString();
  elements.activityLog.prepend(node);
}

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }
  return response.json();
}

function renderProducts(products) {
  elements.productTableBody.innerHTML = '';
  if (!products.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 6;
    cell.textContent = t('dashboard.products.empty');
    cell.className = 'table-empty';
    row.appendChild(cell);
    elements.productTableBody.appendChild(row);
    return;
  }

  for (const product of products) {
    const row = document.createElement('tr');
    const price = new Intl.NumberFormat(state.lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(product.price);
    row.innerHTML = `
      <td>${product.sku}</td>
      <td>${product.title}</td>
      <td>${price}</td>
      <td>${product.stock}</td>
      <td>${product.channels.map((c) => `<span class="tag">${c}</span>`).join(' ')}</td>
      <td>${new Date(product.updated_at).toLocaleString()}</td>
    `;
    elements.productTableBody.appendChild(row);
  }
}

function renderIntegrationStatus(statuses) {
  elements.integrationStatus.innerHTML = '';
  for (const status of statuses) {
    const node = elements.statusCardTemplate.content.cloneNode(true);
    node.querySelector('h3').textContent = status.channel.toUpperCase();
    node.querySelector('.status-detail').textContent = status.details || t('dashboard.integrations.ready');
    node.querySelector('.status-time').textContent = status.last_sync
      ? t('dashboard.integrations.lastSynced', {
          time: new Date(status.last_sync).toLocaleString(),
        })
      : t('dashboard.integrations.neverSynced');
    if (!status.connected) {
      node.querySelector('.status-dot').style.background = '#ef4444';
    }
    elements.integrationStatus.appendChild(node);
  }
}

function parseJSONInput(textarea) {
  try {
    const value = JSON.parse(textarea.value);
    if (!Array.isArray(value)) {
      throw new Error('Value is not array');
    }
    return value;
  } catch (error) {
    throw new Error(`${t('errors.invalidJSON')}: ${error.message}`);
  }
}

async function loadProducts() {
  try {
    const products = await fetchJSON(`${API_BASE}/products`);
    state.products = products;
    renderProducts(products);
    logActivity(t('logs.productsLoaded'));
  } catch (error) {
    logActivity(t('logs.productsFailed'), error.message);
  }
}

async function loadIntegrationStatus() {
  try {
    const statuses = await fetchJSON(`${API_BASE}/integrations/status`);
    state.integrations = statuses;
    renderIntegrationStatus(statuses);
    logActivity(t('logs.integrationsLoaded'));
  } catch (error) {
    logActivity(t('logs.integrationsFailed'), error.message);
  }
}

async function handleBulkUpload() {
  try {
    const payload = parseJSONInput(elements.bulkUploadInput);
    const result = await fetchJSON(`${API_BASE}/products/bulk-upload`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    logActivity(t('logs.uploadSuccess', result));
    elements.bulkUploadInput.value = '';
    await loadProducts();
  } catch (error) {
    logActivity(t('logs.uploadError'), error.message);
  }
}

async function handleBulkUpdate() {
  try {
    const payload = parseJSONInput(elements.bulkUpdateInput);
    const result = await fetchJSON(`${API_BASE}/products/bulk-update`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    logActivity(t('logs.updateSuccess', result));
    elements.bulkUpdateInput.value = '';
    await loadProducts();
  } catch (error) {
    logActivity(t('logs.updateError'), error.message);
  }
}

async function handleSync() {
  elements.syncButton.disabled = true;
  const previousText = elements.syncButton.textContent;
  elements.syncButton.textContent = t('dashboard.sync.running');
  try {
    const results = await fetchJSON(`${API_BASE}/integrations/sync`, { method: 'POST' });
    for (const result of results) {
      logActivity(
        t('logs.syncChannel', {
          channel: result.channel.toUpperCase(),
          count: result.synced_products,
        }),
      );
    }
    await loadIntegrationStatus();
  } catch (error) {
    logActivity(t('logs.syncError'), error.message);
  } finally {
    elements.syncButton.disabled = false;
    elements.syncButton.textContent = previousText;
  }
}

function setActiveLanguage(lang) {
  state.lang = lang;
  elements.languageSwitcher.querySelectorAll('button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  applyTranslations();
}

async function handleAnalysis(event) {
  event.preventDefault();
  const payload = {
    title: document.getElementById('analysisTitle').value,
    description: document.getElementById('analysisDescription').value,
    price: Number(document.getElementById('analysisPrice').value || 0),
    stock: Number(document.getElementById('analysisStock').value || 0),
    category: document.getElementById('analysisCategory').value,
  };
  try {
    const insight = await fetchJSON(`${API_BASE}/ai/analyze`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    renderAnalysisResult(insight);
    logActivity(t('logs.analysisSuccess'));
  } catch (error) {
    elements.analysisResult.textContent = `${t('errors.requestFailed')}: ${error.message}`;
    state.analysis = null;
    logActivity(t('logs.analysisError'), error.message);
  }
}

function renderAnalysisResult(insight) {
  state.analysis = insight;
  const demand = t(`demandLevels.${insight.demand}`);
  const formattedPrice = new Intl.NumberFormat(state.lang, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(insight.suggested_price);
  const recommendationMap = t('ai.analysis.recommendationsMap') || {};
  const list = insight.recommendations
    .map((item) => recommendationMap[item] || item)
    .map((item) => `<li>${item}</li>`)
    .join('');
  elements.analysisResult.innerHTML = `
    <h4>${t('ai.analysis.result.title')}</h4>
    <p><strong>${t('ai.analysis.result.score')}:</strong> ${insight.health_score}/100</p>
    <p><strong>${t('ai.analysis.result.demand')}:</strong> ${demand}</p>
    <p><strong>${t('ai.analysis.result.suggestedPrice')}:</strong> ${formattedPrice}</p>
    <h5>${t('ai.analysis.result.suggestions')}</h5>
    <ul>${list}</ul>
  `;
}

async function handleSEO(event) {
  event.preventDefault();
  const payload = {
    title: document.getElementById('seoTitle').value,
    description: document.getElementById('seoDescription').value,
    keywords: document
      .getElementById('seoKeywords')
      .value.split(',')
      .map((kw) => kw.trim())
      .filter(Boolean),
    language: document.getElementById('seoLanguage').value,
  };
  try {
    const result = await fetchJSON(`${API_BASE}/ai/seo`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    renderSEOResult(result);
    logActivity(t('logs.seoSuccess'));
  } catch (error) {
    elements.seoResult.textContent = `${t('errors.requestFailed')}: ${error.message}`;
    state.seo = null;
    logActivity(t('logs.seoError'), error.message);
  }
}

function renderSEOResult(result) {
  state.seo = result;
  elements.seoResult.innerHTML = `
    <h4>${t('ai.seo.result.title')}</h4>
    <p><strong>${t('ai.seo.result.generatedTitle')}:</strong> ${result.optimized_title}</p>
    <p><strong>${t('ai.seo.result.generatedDescription')}:</strong> ${result.optimized_description}</p>
    <p><strong>${t('ai.seo.result.keywords')}:</strong> ${result.keywords.join(', ')}</p>
  `;
}

async function handleImage(event) {
  event.preventDefault();
  const payload = {
    prompt: document.getElementById('imagePrompt').value,
    count: Number(document.getElementById('imageCount').value || 1),
    aspect_ratio: document.getElementById('imageRatio').value,
  };
  try {
    const result = await fetchJSON(`${API_BASE}/ai/images`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    renderImageResult(result);
    logActivity(t('logs.imageSuccess'));
  } catch (error) {
    elements.imageResult.textContent = `${t('errors.requestFailed')}: ${error.message}`;
    state.images = null;
    logActivity(t('logs.imageError'), error.message);
  }
}

function renderImageResult(result) {
  state.images = result;
  if (!result.images.length) {
    elements.imageResult.textContent = t('ai.images.result.empty');
    return;
  }
  const nodes = result.images
    .map(
      (img) => `
        <a href="${img.url}" target="_blank" rel="noopener" class="image-chip">
          <img src="${img.url}" alt="${img.prompt}" />
          <span>${img.prompt}</span>
        </a>
      `,
    )
    .join('');
  elements.imageResult.innerHTML = `
    <h4>${t('ai.images.result.title')}</h4>
    <div class="image-grid">${nodes}</div>
  `;
}

function initLanguageSelector() {
  elements.languageSwitcher.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-lang]');
    if (!button) return;
    const lang = button.dataset.lang;
    if (translations[lang]) {
      setActiveLanguage(lang);
    }
  });
}

function initEvents() {
  elements.bulkUploadButton.addEventListener('click', handleBulkUpload);
  elements.bulkUpdateButton.addEventListener('click', handleBulkUpdate);
  elements.syncButton.addEventListener('click', handleSync);
  elements.refreshProductsButton.addEventListener('click', loadProducts);
  elements.refreshIntegrationsButton.addEventListener('click', loadIntegrationStatus);
  elements.analysisForm.addEventListener('submit', handleAnalysis);
  elements.seoForm.addEventListener('submit', handleSEO);
  elements.imageForm.addEventListener('submit', handleImage);
}

async function init() {
  initLanguageSelector();
  initEvents();
  applyTranslations();
  await loadIntegrationStatus();
  await loadProducts();
}

document.addEventListener('DOMContentLoaded', init);
