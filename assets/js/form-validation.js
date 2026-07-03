/* ============================================================
   FORM-VALIDATION.JS — Hanya dimuat di halaman Kontak
   Referensi: 07-spesifikasi-teknis.md — bagian 5.4
   Tanggung jawab:
   - Validasi client-side (required fields, format email)
   - Menampilkan pesan error inline per field (bukan alert())
   - Mencegah submit jika ada field tidak valid
   - Menampilkan pesan sukses setelah submit (tanpa backend,
     cukup tampilkan state sukses — lihat 07 bagian 7 untuk
     opsi integrasi backend selanjutnya)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const errorEl = field.parentElement.querySelector('.form-error');
      if (!errorEl) return;

      if (!field.value.trim()) {
        isValid = false;
        errorEl.textContent = 'Kolom ini wajib diisi.';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        isValid = false;
        errorEl.textContent = 'Format email tidak valid.';
      } else {
        errorEl.textContent = '';
      }
    });

    if (isValid) {
      // TODO: kirim data ke backend/endpoint (lihat 07-spesifikasi-teknis.md bagian 7)
      form.reset();
      if (formSuccess) formSuccess.hidden = false;
    } else {
      if (formSuccess) formSuccess.hidden = true;
    }
  });

  // Bersihkan pesan error saat pengguna mulai mengetik ulang
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.textContent = '';
    });
  });
});