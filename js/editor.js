/* =========================================================
   editor.js
   Savas spēles redaktors (izveidot.html).
   Lietotājs ieraksta 5 kategorijas un 25 jautājumus.
   Spēle tiek saglabāta localStorage ar id "mana", un to var
   arī lejupielādēt vai ielādēt kā JSON failu.
   ========================================================= */

const KEY_CUSTOM = "vv-custom";
const EDITOR_POINTS = [100, 200, 300, 400, 500];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editorForm");
  if (!form) {
    return;
  }
  const catBox = document.getElementById("editorCategories");
  const status = document.getElementById("editorStatus");

  /* ---------- Formas lauku izveide (5 kategorijas x 5 jautājumi) ---------- */
  for (let c = 0; c < 5; c++) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "editor-category";
    let rows = "";
    EDITOR_POINTS.forEach((points, r) => {
      rows += `
        <div class="row g-2 align-items-start editor-row">
          <div class="col-12 col-md-auto pt-md-1">
            <span class="points-tag">${points}</span>
          </div>
          <div class="col-12 col-md">
            <label class="visually-hidden" for="q-${c}-${r}">Jautājums par ${points}</label>
            <input type="text" class="form-control" id="q-${c}-${r}" placeholder="Jautājums"
                   minlength="5" maxlength="160" required>
            <div class="invalid-feedback">Jautājumam jābūt vismaz 5 rakstzīmes garam.</div>
          </div>
          <div class="col-12 col-md-4">
            <label class="visually-hidden" for="a-${c}-${r}">Atbilde par ${points}</label>
            <input type="text" class="form-control" id="a-${c}-${r}" placeholder="Atbilde"
                   maxlength="80" required>
            <div class="invalid-feedback">Ieraksti atbildi.</div>
          </div>
        </div>`;
    });
    fieldset.innerHTML = `
      <legend>${c + 1}. kategorija</legend>
      <label class="form-label" for="cat-${c}">Kategorijas nosaukums</label>
      <input type="text" class="form-control" id="cat-${c}" maxlength="24"
             placeholder="Piem., Mūsu klase" required>
      <div class="invalid-feedback">Ieraksti kategorijas nosaukumu (līdz 24 rakstzīmēm).</div>
      ${rows}`;
    catBox.appendChild(fieldset);
  }

  /* ---------- Formas aizpildīšana no spēles objekta ---------- */
  function fillForm(set) {
    document.getElementById("gameName").value = set.title || "";
    set.categories.forEach((cat, c) => {
      document.getElementById(`cat-${c}`).value = cat.name;
      cat.questions.forEach((item, r) => {
        document.getElementById(`q-${c}-${r}`).value = item.q;
        document.getElementById(`a-${c}-${r}`).value = item.a;
      });
    });
  }

  /* ---------- Spēles objekta izveide no formas ---------- */
  function readForm() {
    const categories = [];
    for (let c = 0; c < 5; c++) {
      const questions = EDITOR_POINTS.map((p, r) => ({
        q: document.getElementById(`q-${c}-${r}`).value.trim(),
        a: document.getElementById(`a-${c}-${r}`).value.trim()
      }));
      categories.push({ name: document.getElementById(`cat-${c}`).value.trim(), questions });
    }
    return {
      title: document.getElementById("gameName").value.trim(),
      description: "Pašu veidota spēle.",
      level: "Pašu",
      categories
    };
  }

  /* Pārbauda, vai ielādētajam failam ir pareiza struktūra */
  function isValidSet(data) {
    return data && typeof data.title === "string" && Array.isArray(data.categories) &&
      data.categories.length === 5 &&
      data.categories.every((cat) => typeof cat.name === "string" &&
        Array.isArray(cat.questions) && cat.questions.length === 5 &&
        cat.questions.every((item) => typeof item.q === "string" && typeof item.a === "string"));
  }

  /* Paziņojuma parādīšana */
  function showStatus(type, html) {
    status.className = `alert alert-${type} mt-3`;
    status.innerHTML = html;
  }

  /* Ja spēle jau saglabāta, ielādē to formā */
  const saved = VV.load(KEY_CUSTOM, null);
  if (saved && isValidSet(saved)) {
    fillForm(saved);
    showStatus("info", "Ielādēta tava iepriekš saglabātā spēle. Vari to labot.");
  }

  /* ---------- Saglabāšana ---------- */
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      const firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      showStatus("danger", "Spēle nav saglabāta: aizpildi visus iezīmētos laukus.");
      return;
    }
    form.classList.remove("was-validated");
    VV.save(KEY_CUSTOM, readForm());
    showStatus("success",
      'Spēle saglabāta! <a class="alert-link" href="spelet.html?set=mana">Sākt spēli</a>');
  });

  /* ---------- Piemēra aizpilde (ērtai izmēģināšanai) ---------- */
  document.getElementById("fillExample").addEventListener("click", () => {
    const example = window.QUESTION_SETS.latvija;
    fillForm({ ...example, title: "Mana Latvijas viktorīna" });
    showStatus("info", "Forma aizpildīta ar piemēru. Pamaini jautājumus un saglabā.");
  });

  /* ---------- Eksports uz JSON failu ---------- */
  document.getElementById("exportBtn").addEventListener("click", () => {
    const data = readForm();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = (data.title || "mana-spele").replace(/[^\wāčēģīķļņšūž-]+/gi, "-") + ".json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  /* ---------- Imports no JSON faila ---------- */
  document.getElementById("importFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!isValidSet(data)) {
          throw new Error("struktūra");
        }
        fillForm(data);
        showStatus("success", "Fails ielādēts. Pārbaudi jautājumus un nospied \"Saglabāt spēli\".");
      } catch (err) {
        showStatus("danger", "Šo failu nevar ielādēt. Vajag JSON failu ar 5 kategorijām un 25 jautājumiem.");
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  });
});
