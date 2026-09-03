/* ============================================================
   ANIMATIONS.JS — Dimuat di halaman yang butuh animasi
   (Beranda, Tentang Kami, Portofolio)
   Referensi: 07-spesifikasi-teknis.md — bagian 5.2
   Tanggung jawab:
   - Scroll-reveal (fade-in/slide-up saat masuk viewport)
   - Counter animasi untuk angka statistik

   CATATAN AKSESIBILITAS:
   Animasi di file ini (scroll-reveal & counter) dijalankan lewat
   JavaScript murni (class toggle & requestAnimationFrame), bukan
   CSS transition/animation — sehingga TIDAK otomatis terjangkau
   oleh aturan @media (prefers-reduced-motion: reduce) di base.css.
   Karena itu, prefers-reduced-motion dicek langsung di sini via
   matchMedia() agar pengguna yang sensitif terhadap gerakan tetap
   dihormati preferensinya.
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal
if (prefersReducedMotion) {
  // Langsung tampilkan semua elemen tanpa animasi fade-in/slide-up
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
}

// Counter animasi
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * progress;
    el.textContent = (target % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function setFinalCounterValue(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  el.textContent = (target % 1 === 0 ? target : target.toFixed(1)) + suffix;
}

if (prefersReducedMotion) {
  // Langsung tampilkan angka akhir tanpa animasi hitung naik
  document.querySelectorAll('[data-count]').forEach(el => setFinalCounterValue(el));
} else {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
}