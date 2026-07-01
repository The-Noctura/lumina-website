/* ============================================================
   MAIN.JS — Global, dimuat di semua halaman
   Referensi: 07-spesifikasi-teknis.md — bagian 5.1
   Tanggung jawab:
   - Toggle menu navbar mobile (buka/tutup + aria-expanded)
   - Highlight link navbar aktif sesuai halaman berjalan
   - Navbar berubah style saat discroll
   - Set tahun otomatis di footer
   - Smooth scroll untuk anchor link internal (jika ada)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('navbar__menu--open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Tutup menu saat link diklik (khusus mobile)
    navMenu.querySelectorAll('.navbar__link, .navbar__cta').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('navbar__menu--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight active link (fallback otomatis jika belum ditandai manual di HTML)
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('navbar__link--active');
    }
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll state
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 20);
    }, { passive: true });
  }
});