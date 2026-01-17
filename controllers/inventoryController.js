const db = require("../db/mysql_connect");
const Response = require("../utils/response");

const getInventoryAnalysis = async (req, res) => {
    const [products] = await db.query(`
        SELECT p.*, COALESCE(AVG(s.quantity), 0) as daily_demand
        FROM products p
        LEFT JOIN sales s ON p.id = s.product_id AND s.sale_date > DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY p.id
    `);

    const analysis = products.map(p => {
        const stockDays = p.daily_demand > 0 ? Math.floor(p.stock_quantity / p.daily_demand) : 999;
        let status = "NORMAL";
        
        if (stockDays <= 7) status = "CRITICAL";
        if (stockDays > 90) status = "OVERSTOCK";

        return {
            ...p,
            analysis: {
                stock_days: stockDays,
                status: status,
                recommendation: status === "CRITICAL" ? "Acil Sipariş Ver" : (status === "OVERSTOCK" ? "Kampanya Yap" : "Bekle")
            }
        };
    });

    return new Response(analysis).success(res);
};

module.exports = { getInventoryAnalysis };