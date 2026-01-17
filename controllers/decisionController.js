const db = require("../db/mysql_connect");
const Response = require("../utils/response");
const APIError = require("../utils/errors");

// Yardımcı Fonksiyon: Stok gün sayısını hesapla
const calculateStockDays = (stock, dailyDemand) => {
    if (dailyDemand <= 0) return 999; // Satış yoksa stok bitmez kabul edilir
    return Math.floor(stock / dailyDemand);
};

const getDecisionAnalysis = async (req, res) => {
    // 1. Veritabanından Ürünleri ve Satış Verilerini Çek
    // Bu sorgu: Ürünleri, stoğu ve son 30 gündeki ortalama günlük satış hızını getirir.
    const query = `
        SELECT 
            p.id, 
            p.name, 
            p.stock_quantity, 
            p.price,
            COALESCE(AVG(s.quantity), 0) as daily_demand
        FROM products p
        LEFT JOIN sales s ON p.id = s.product_id 
        AND s.sale_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY p.id
    `;

    const [products] = await db.query(query);

    if (!products || products.length === 0) {
        throw new APIError("Analiz edilecek ürün bulunamadı", 404);
    }

    // 2. Karar Motoru (Decision Engine) Mantığını İşlet
    const analysisResults = products.map(product => {
        const dailyDemand = parseFloat(product.daily_demand);
        const stockDays = calculateStockDays(product.stock_quantity, dailyDemand);
        
        let decision = "NORMAL";
        let suggestion = "Stok seviyesi sağlıklı.";
        let priorityScore = 10;

        // --- ALGORİTMA: Proje Son'dan Alınan Mantık ---
        
        // Kural 1: Kritik Stok (7 günden az)
        if (stockDays <= 7) {
            decision = "KRITIK_DUSUK";
            suggestion = `ACİL SİPARİŞ! Stok ${stockDays} gün içinde bitecek.`;
            priorityScore = 100;
        } 
        // Kural 2: Ölü Stok (60 günden fazla ve satış yok denecek kadar az)
        else if (stockDays > 60 && dailyDemand < 1) {
            decision = "OLU_STOK";
            suggestion = "Nakit akışı için %20 indirim kampanyası başlatın.";
            priorityScore = 80;
        } 
        // Kural 3: Yüksek Stok (45 günden fazla)
        else if (stockDays > 45) {
            decision = "YUKSEK_STOK";
            suggestion = "Stok devir hızını artırmak için Bundle yapın.";
            priorityScore = 60;
        }

        return {
            urun_id: product.id,
            urun_adi: product.name,
            mevcut_stok: product.stock_quantity,
            metrikler: {
                gunluk_satis_hizi: dailyDemand.toFixed(2),
                stok_gun_sayisi: stockDays
            },
            analiz_sonucu: {
                durum: decision,
                aksiyon_onerisi: suggestion,
                oncelik_puani: priorityScore
            }
        };
    });

    // 3. Sonuçları Öncelik Puanına Göre Sırala (En acil en üstte)
    analysisResults.sort((a, b) => b.analiz_sonucu.oncelik_puani - a.analiz_sonucu.oncelik_puani);

    return new Response(analysisResults, "DSS Analizi Tamamlandı").success(res);
};

module.exports = {
    getDecisionAnalysis
};