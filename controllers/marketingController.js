const db = require("../db/mysql_connect");
const Response = require("../utils/response");

const getCampaignSuggestions = async (req, res) => {
    // Stok fazlası olan ve satışı yavaş ürünleri bul
    const query = `
        SELECT p.id, p.name, p.stock_quantity, p.price, AVG(s.quantity) as daily_sales
        FROM products p
        LEFT JOIN sales s ON p.id = s.product_id
        GROUP BY p.id
        HAVING p.stock_quantity > 100 AND daily_sales < 1
    `;
    const [products] = await db.query(query);

    const suggestions = products.map(product => {
        return {
            urun: product.name,
            durum: "Yüksek Stok / Düşük Satış",
            onerilen_kampanya: "FLASH_SALE",
            indirim_orani: "%20",
            aciklama: `Stok eritmek için ${product.name} ürününde 24 saatlik şok indirim yapın.`
        };
    });

    return new Response(suggestions).success(res);
};

module.exports = { getCampaignSuggestions };