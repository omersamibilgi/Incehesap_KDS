const db = require("../db/mysql_connect");
const Response = require("../utils/response");

// Gelir Trendi Analizi
const getRevenueTrend = async (req, res) => {
    // Son 6 ayın gelir verisi
    const query = `
        SELECT 
            DATE_FORMAT(sale_date, '%Y-%m') as ay,
            SUM(total_price) as ciro,
            COUNT(id) as siparis_sayisi
        FROM sales
        WHERE sale_date >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY ay
        ORDER BY ay ASC
    `;
    const [rows] = await db.query(query);

    // Büyüme Oranı Hesaplama (Growth Rate Logic)
    const trendAnalizi = rows.map((item, index, array) => {
        let buyume = 0;
        if (index > 0) {
            const oncekiAy = array[index - 1].ciro;
            buyume = ((item.ciro - oncekiAy) / oncekiAy) * 100;
        }
        return {
            ...item,
            buyume_yuzdesi: buyume.toFixed(2)
        };
    });

    return new Response(trendAnalizi).success(res);
};

// Kategori Bazlı Satış
const getCategoryPerformance = async (req, res) => {
    const query = `
        SELECT c.name as kategori, SUM(s.total_price) as toplam_ciro
        FROM sales s
        JOIN products p ON s.product_id = p.id
        JOIN categories c ON p.category_id = c.id
        GROUP BY c.name
        ORDER BY toplam_ciro DESC
    `;
    const [rows] = await db.query(query);
    return new Response(rows).success(res);
};

module.exports = { getRevenueTrend, getCategoryPerformance };