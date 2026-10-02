// =========================================================
// Tahun otomatis di footer
// =========================================================
document.getElementById("year").textContent = new Date().getFullYear();

// =========================================================
// Toggle menu navigasi (mobile)
// =========================================================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Tutup menu otomatis saat salah satu link diklik (mobile)
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// =========================================================
// Validasi form kontak
// =========================================================
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const fields = {
  nama: {
    input: document.getElementById("nama"),
    error: document.getElementById("nama-error"),
    validate: (value) => {
      if (value.trim().length === 0) return "Nama wajib diisi.";
      if (value.trim().length < 3) return "Nama minimal 3 karakter.";
      return "";
    },
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    validate: (value) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim().length === 0) return "Email wajib diisi.";
      if (!emailPattern.test(value)) return "Format email tidak valid.";
      return "";
    },
  },
  pesan: {
    input: document.getElementById("pesan"),
    error: document.getElementById("pesan-error"),
    validate: (value) => {
      if (value.trim().length === 0) return "Pesan wajib diisi.";
      if (value.trim().length < 10) return "Pesan minimal 10 karakter.";
      return "";
    },
  },
};

function validateField(field) {
  const message = field.validate(field.input.value);
  field.error.textContent = message;
  field.input.setAttribute("data-touched", "true");
  return message === "";
}

// Validasi real-time saat user selesai mengetik (blur)
Object.values(fields).forEach((field) => {
  field.input.addEventListener("blur", () => validateField(field));
  field.input.addEventListener("input", () => {
    if (field.input.getAttribute("data-touched") === "true") {
      validateField(field);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const results = Object.values(fields).map((field) => validateField(field));
  const isFormValid = results.every(Boolean);

  if (!isFormValid) {
    formStatus.textContent = "Mohon periksa kembali data yang kamu isi.";
    formStatus.setAttribute("data-state", "error");
    return;
  }

  // Catatan: belum terhubung ke backend / email service.
  // Ganti bagian ini dengan pemanggilan API/EmailJS/dsb saat siap.
  formStatus.textContent = "Terima kasih! Pesan kamu berhasil terkirim.";
  formStatus.setAttribute("data-state", "success");
  form.reset();

  Object.values(fields).forEach((field) => {
    field.input.removeAttribute("data-touched");
  });
});
