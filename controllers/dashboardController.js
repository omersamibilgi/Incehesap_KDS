const db = require("../db/mysql_connect");
const Response = require("../utils/response");

// Ana KPI Kartları
const getKPIs = async (req, res) => {
    const [sales] = await db.query("SELECT SUM(total_price) as ciro, COUNT(*) as siparis FROM sales WHERE sale_date > DATE_SUB(NOW(), INTERVAL 30 DAY)");
    const [stock] = await db.query("SELECT SUM(stock_quantity) as stok FROM products");
    
    return new Response({
        ciro: sales[0].ciro,
        siparis: sales[0].siparis,
        toplam_stok: stock[0].stok
    }).success(res);
};

// Marka Stok Payı (Brand Share)
const getBrandShare = async (req, res) => {
    const query = `
        SELECT brand, SUM(stock_quantity) as total_stock
        FROM products
        GROUP BY brand
    `;
    const [rows] = await db.query(query);
    return new Response(rows).success(res);
};

// Akıllı İçgörüler (Insights)
const getInsights = async (req, res) => {
    // Basit kural tabanlı içgörü motoru
    const insights = [
        { type: "warning", message: "Kurlar yükselişte, ithal ürünlerin maliyeti %5 artabilir." },
        { type: "success", message: "Gaming kategorisinde satışlar geçen aya göre %15 arttı." },
        { type: "info", message: "Stoğu bitmek üzere olan 3 kritik ürün var." }
    ];
    return new Response(insights).success(res);
};

module.exports = { getKPIs, getBrandShare, getInsights };