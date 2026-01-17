// Sayfa yüklendiğinde çalışır
document.addEventListener('DOMContentLoaded', () => {
    fetchKPIs();
    fetchInventory();
    fetchMarketing();
});

// 1. KPI Verilerini Çek
async function fetchKPIs() {
    try {
        const res = await fetch('/api/dashboard/kpi');
        const json = await res.json();
        if (json.success) {
            document.getElementById('kpi-ciro').innerText = json.data.ciro + ' ₺';
            document.getElementById('kpi-siparis').innerText = json.data.siparis + ' Adet';
            document.getElementById('kpi-stok').innerText = json.data.toplam_stok;
        }
    } catch (err) { console.error(err); }
}

// 2. Stok Analizini Çek (Tabloyu Doldur)
async function fetchInventory() {
    try {
        const res = await fetch('/api/inventory/analyze'); // Backend rotan
        const json = await res.json();
        
        const tbody = document.getElementById('inventory-table');
        tbody.innerHTML = '';

        if (json.success) {
            json.data.forEach(item => {
                // Sadece kritik olanları gösterelim
                if (item.analiz.risk_puani > 50) {
                    const row = `
                        <tr>
                            <td>${item.urun_adi}</td>
                            <td>${item.mevcut_stok}</td>
                            <td><strong>${item.metrikler.stok_gun_sayisi} Gün</strong></td>
                            <td class="text-danger">${item.analiz_sonucu.aksiyon_onerisi}</td>
                            <td><span class="badge bg-danger">${item.analiz_sonucu.oncelik_puani}</span></td>
                        </tr>
                    `;
                    tbody.innerHTML += row;
                }
            });
        }
    } catch (err) { console.error(err); }
}

// 3. Kampanya Önerilerini Çek
async function fetchMarketing() {
    try {
        const res = await fetch('/api/marketing/suggestions');
        const json = await res.json();
        const list = document.getElementById('marketing-list');
        
        if (json.success && json.data.length > 0) {
            json.data.forEach(camp => {
                const li = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${camp.aciklama}
                    <span class="badge bg-primary rounded-pill">${camp.indirim_orani} İndirim</span>
                </li>`;
                list.innerHTML += li;
            });
        } else {
            list.innerHTML = '<li class="list-group-item">Şu an kampanya önerisi yok.</li>';
        }
    } catch (err) { console.error(err); }
}