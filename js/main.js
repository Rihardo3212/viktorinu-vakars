/* =========================================================
   main.js
   Kopējās funkcijas, ko izmanto visas lapas:
   localStorage palīgfunkcijas, gads kājenē, galerijas logs.
   ========================================================= */

/* ---------- Kopīgais objekts VV (Viktorīnu vakars) ---------- */
window.VV = {

  /* Nolasa vērtību no localStorage. Ja nav vai ir kļūda, atgriež fallback. */
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  },

  /* Saglabā vērtību localStorage kā JSON tekstu. */
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  },

  /* Izdzēš vērtību no localStorage. */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      /* nekas nav jādara */
    }
  },

  /* Aizsargā tekstu pirms ievietošanas HTML (lai lietotāja teksts nekļūst par kodu). */
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = String(text);
    return div.innerHTML;
  },

  /* Atgriež jautājumu krājumu pēc id. "mana" ir lietotāja paša veidotā spēle. */
  getSet(id) {
    if (id === "mana") {
      return VV.load("vv-custom", null);
    }
    return (window.QUESTION_SETS || {})[id] || null;
  }
};

/* ---------- Kad lapa ielādēta ---------- */
document.addEventListener("DOMContentLoaded", () => {

  /* Pašreizējais gads kājenē */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* Tumšā režīma pārslēgšana. Izvēle tiek saglabāta localStorage,
     un sākuma vērtību jau iestata skripts lapas <head> daļā. */
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    const root = document.documentElement;
    const icon = toggle.querySelector(".bi");
    const update = () => {
      const dark = root.getAttribute("data-bs-theme") === "dark";
      icon.className = dark ? "bi bi-sun" : "bi bi-moon-stars";
      toggle.setAttribute("aria-label", dark ? "Ieslēgt gaišo režīmu" : "Ieslēgt tumšo režīmu");
      toggle.title = dark ? "Gaišais režīms" : "Tumšais režīms";
      toggle.setAttribute("aria-pressed", String(dark));
    };
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-bs-theme", next);
      try {
        localStorage.setItem("vv-theme", next);
      } catch (err) {
        /* ja localStorage nav pieejams, režīms vienkārši netiek atcerēts */
      }
      update();
    });
    update();
  }

  /* Galerijas logs: uzspiežot uz attēla, to parāda lielāku */
  const galleryModal = document.getElementById("galleryModal");
  if (galleryModal) {
    galleryModal.addEventListener("show.bs.modal", (event) => {
      const trigger = event.relatedTarget;
      const img = galleryModal.querySelector("img");
      img.src = trigger.dataset.img;
      img.alt = trigger.dataset.caption;
      galleryModal.querySelector(".modal-title").textContent = trigger.dataset.caption;
    });
  }
});
