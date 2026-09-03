/* ============================================================
   PORTFOLIO-FILTER.JS — Hanya dimuat di halaman Portofolio
   Referensi: 07-spesifikasi-teknis.md — bagian 5.3
   Tanggung jawab:
   - Filter kartu proyek berdasarkan kategori industri
     tanpa reload halaman
   - Mencocokkan tombol [data-filter] dengan kartu [data-category]
     di portofolio.html
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');

  if (!filterButtons.length || !items.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.display = match ? '' : 'none';
      });
    });
  });
});