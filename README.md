# İncehesap Karar Destek Sistemi (DSS)

## 🎯 Amaç

Sistem otomatik karar üretmez. Öneri / içgörü / risk / senaryo sunar. Her önerinin yanında:
- Dayanak metrikler
- Varsayımlar
- Hesaplama yöntemi
- "Neden bu öneri?" açıklaması

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend**: Node.js (Express) + TypeScript
- **Grafikler**: Recharts
- **State Management**: Zustand
- **Timezone**: Europe/Istanbul
- **Para Birimi**: TRY
- **Tarih Formatı**: TR

## 📋 Özellikler

### Modüller

1. **Overview (Yönetici Özeti)** ✅
   - KPI kartları (Ciro, Kâr, Marj, Stok metrikleri)
   - Günlük ciro trendi (Line chart)
   - Kategori bazlı ciro dağılımı (Bar chart)
   - Marka bazlı stok sermayesi (Donut chart)
   - İçgörü kutusu
   - Her grafik için "Bilgi Kartı" (Drawer)
   - Her grafik için "Odak Modu" (Tam ekran)

2. **Inventory (Stok Takip)** ✅
   - Stok seviyesi tablosu
   - Durum etiketleri (Kritik, Düşük, Normal, Fazla, Ölü stok)
   - Arama, sıralama, sayfalama
   - CSV export

### UI Özellikleri

- ✅ Sol menü navigasyon (Sidebar)
- ✅ Üstte global filtre barı (Tarih, Kategori, Marka, Depo, Durum, Kampanya)
- ✅ Her grafik için "Bilgi Kartı" (Drawer)
- ✅ Her grafik için "Odak Modu" (Tam ekran görünüm)
- ✅ Türkçe metinler ve etiketler
- ✅ Responsive tasarım


## 📁 Proje Yapısı

```
.
├── package.json              # Root workspace config
├── README.md
├── frontend/                 # Frontend (Next.js)
│   ├── app/
│   │   ├── overview/         # Yönetici Özeti sayfası
│   │   ├── inventory/        # Stok Takip sayfası
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/           # Sidebar, TopFilterBar
│   │   └── common/           # Drawer, InfoCard, ChartCard, FocusMode
│   ├── lib/
│   │   ├── api.ts            # Data access layer
│   │   ├── mock/             # Mock data generator
│   │   └── format.ts         # Formatting utilities
│   └── package.json
└── backend/                  # Backend (Express)
    ├── src/
    │   ├── index.ts          # Express server
    │   ├── routes/            # API routes
    │   └── data/
    │       └── mockData.ts   # Mock data (shared logic)
    └── package.json
```

## 🔌 API Endpoints

### Health
- `GET /api/health` - Sağlık kontrolü

### KPI'lar
- `GET /api/kpis?start=YYYY-MM-DD&end=YYYY-MM-DD&category_id=&brand_id=&warehouse_id=&is_active=&campaign_id=`

### Ciro Trendi
- `GET /api/revenue-trend?start=&end=&groupBy=day|week|month&category_id=&brand_id=`

### Kategori Bazlı Ciro
- `GET /api/revenue-by-category?start=&end=&category_id=`

### Marka Bazlı Stok Sermayesi
- `GET /api/brand-stock-share?start=&end=&brand_id=`

### İçgörüler
- `GET /api/insights/overview?start=&end=`

### Stok Sağlık Durumu
- `GET /api/stock-health?start=&end=&category_id=&brand_id=&warehouse_id=&status=`


Bu proje İncehesap için geliştirilmiştir.
