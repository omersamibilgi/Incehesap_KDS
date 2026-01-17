const db = require("../db/mysql_connect");
const Response = require("../utils/response");

// Kur Simülasyonu (Scenario Planning)
const getProcurementScenarios = async (req, res) => {
    // Güncel kuru parametre olarak alabiliriz veya sabit tutabiliriz
    const currentUSD = 34.50; 
    
    const query = `SELECT id, name, cost_price_usd FROM products WHERE stock_quantity < 20`;
    const [products] = await db.query(query);

    const senaryolar = products.map(product => {
        const maliyetTL = product.cost_price_usd * currentUSD;
        
        // Senaryo 1: Dolar %10 artarsa
        const kurArtis = 1.10;
        const riskliMaliyet = maliyetTL * kurArtis;
        
        let karar = "BEKLE";
        if (product.cost_price_usd > 100) { // Pahalı ürünlerde risk yüksek
            karar = "HEMEN_AL"; 
        }

        return {
            urun: product.name,
            suanki_maliyet: maliyetTL.toFixed(2),
            senaryo_maliyet_artis: (riskliMaliyet - maliyetTL).toFixed(2),
            karar_destek_onerisi: karar === "HEMEN_AL" 
                ? "Kur artış riski yüksek, erken alım yaparak marjı koruyun."
                : "Stok devir hızı düşük, kur riskine rağmen alım yapmayın."
        };
    });

    return new Response(senaryolar, "Tedarik Risk Analizi").success(res);
};

module.exports = { getProcurementScenarios };