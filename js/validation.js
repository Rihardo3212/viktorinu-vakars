/* =========================================================
   validation.js
   Jautājuma piedāvāšanas un atsauksmju formu validācija.
   Izmanto HTML5 atribūtus (required, pattern, minlength)
   un papildu pārbaudes JavaScript. Dati nekur netiek sūtīti.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* Visas formas ar klasi "js-validate" */
  const forms = document.querySelectorAll("form.js-validate");

  forms.forEach((form) => {

    /* ---------- Papildu pārbaudes katram laukam ---------- */
    function customChecks() {

      /* Vārdā nedrīkst būt cipari */
      form.querySelectorAll("input[data-name]").forEach((input) => {
        input.setCustomValidity("");
        if (/\d/.test(input.value)) {
          input.setCustomValidity("Vārdā nedrīkst būt cipari");
        }
      });

      /* Jāizvēlas vērtējums (zvaigznes) */
      const rating = form.querySelector("[data-rating]");
      if (rating) {
        const checked = rating.querySelector("input:checked");
        const first = rating.querySelector("input");
        first.setCustomValidity(checked ? "" : "Izvēlies vērtējumu");
        rating.classList.toggle("is-invalid", !checked);
      }
    }

    /* ---------- Rakstzīmju skaitītājs teksta laukam ---------- */
    form.querySelectorAll("textarea[data-counter]").forEach((area) => {
      const counter = document.getElementById(area.dataset.counter);
      const update = () => {
        counter.textContent = `${area.value.length} / ${area.maxLength} rakstzīmes`;
      };
      area.addEventListener("input", update);
      update();
    });

    /* Pārbauda atkārtoti, kamēr lietotājs labo laukus */
    form.addEventListener("input", () => {
      if (form.classList.contains("was-validated")) {
        customChecks();
      }
    });
    form.addEventListener("change", () => {
      if (form.classList.contains("was-validated")) {
        customChecks();
      }
    });

    /* ---------- Iesniegšana ---------- */
    form.addEventListener("submit", (event) => {
      event.preventDefault();          // dati netiek sūtīti uz serveri
      customChecks();

      const success = document.getElementById(form.dataset.success);

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        success.classList.add("d-none");
        /* Fokuss uz pirmo kļūdaino lauku */
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      /* Viss kārtībā: parāda paziņojumu un notīra formu */
      success.classList.remove("d-none");
      form.reset();
      form.classList.remove("was-validated");
      form.querySelectorAll("textarea[data-counter]").forEach((area) => {
        area.dispatchEvent(new Event("input"));
      });
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
});
