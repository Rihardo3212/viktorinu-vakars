/* =========================================================
   game.js
   Spēles loģika trim lapām:
   1) spelet.html   - spēles iestatīšanas forma
   2) spele.html    - spēles laukums, jautājuma logs, punkti
   3) rezultati.html - iepriekšējo spēļu vēsture
   Spēles stāvoklis glabājas localStorage, tāpēc pēc lapas
   pārlādēšanas spēli var turpināt.
   ========================================================= */

/* localStorage atslēgas */
const KEY_SETUP = "vv-setup";      // izvēlētie iestatījumi
const KEY_GAME = "vv-game";        // notiekošās spēles stāvoklis
const KEY_HISTORY = "vv-history";  // pabeigto spēļu saraksts

const POINTS = [100, 200, 300, 400, 500];

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("setupForm")) {
    initSetup();
  }
  if (document.getElementById("board")) {
    initGame();
  }
  if (document.getElementById("historyBody")) {
    initHistory();
  }
});

/* =========================================================
   1) SPĒLES IESTATĪŠANA (spelet.html)
   ========================================================= */
function initSetup() {
  const form = document.getElementById("setupForm");
  const countSelect = document.getElementById("teamCount");
  const namesBox = document.getElementById("teamNames");
  const customOption = document.getElementById("set-mana");

  /* Ja lietotājam ir sava spēle, atļauj to izvēlēties */
  const custom = VV.getSet("mana");
  if (custom) {
    customOption.disabled = false;
    document.getElementById("customSetName").textContent = custom.title;
  }

  /* Iepriekš izvēlētais krājums no saites, piem. spelet.html?set=sports */
  const params = new URLSearchParams(window.location.search);
  const preset = params.get("set");
  const saved = VV.load(KEY_SETUP, null);
  const chosenId = preset || (saved && saved.setId) || "latvija";
  const radio = form.querySelector(`input[name="set"][value="${chosenId}"]`);
  if (radio && !radio.disabled) {
    radio.checked = true;
  }

  /* Komandu nosaukumu lauki pēc izvēlētā skaita */
  const savedNames = saved ? saved.teams : [];
  function renderNameFields() {
    const count = Number(countSelect.value);
    /* Saglabā jau ierakstītos nosaukumus, lai tie nepazūd */
    const current = [...namesBox.querySelectorAll("input")].map((i) => i.value);
    namesBox.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const value = current[i] || savedNames[i] || "";
      const col = document.createElement("div");
      col.className = "col-sm-6";
      col.innerHTML = `
        <label class="form-label" for="team${i}">${i + 1}. komanda</label>
        <input type="text" class="form-control" id="team${i}" maxlength="20"
               placeholder="Piem., Gudrinieki" required value="${VV.escapeHtml(value)}">
        <div class="invalid-feedback">Ieraksti unikālu nosaukumu (1 līdz 20 rakstzīmes).</div>`;
      namesBox.appendChild(col);
    }
  }
  if (saved) {
    countSelect.value = String(saved.teams.length);
    document.getElementById("timer").value = String(saved.timer);
    document.getElementById("doubleCell").checked = saved.double;
  }
  renderNameFields();
  countSelect.addEventListener("change", renderNameFields);

  /* Nosaukumiem jābūt atšķirīgiem */
  function checkUnique() {
    const inputs = [...namesBox.querySelectorAll("input")];
    const seen = new Set();
    inputs.forEach((input) => {
      const name = input.value.trim().toLowerCase();
      input.setCustomValidity("");
      if (name === "") {
        input.setCustomValidity("Tukšs nosaukums");
      } else if (seen.has(name)) {
        input.setCustomValidity("Nosaukums atkārtojas");
      }
      seen.add(name);
    });
  }
  namesBox.addEventListener("input", () => {
    if (form.classList.contains("was-validated")) {
      checkUnique();
    }
  });

  /* Iesniedzot formu, saglabā iestatījumus un atver spēli */
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkUnique();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const setup = {
      setId: form.querySelector('input[name="set"]:checked').value,
      teams: [...namesBox.querySelectorAll("input")].map((i) => i.value.trim()),
      timer: Number(document.getElementById("timer").value),
      double: document.getElementById("doubleCell").checked
    };
    VV.save(KEY_SETUP, setup);
    VV.remove(KEY_GAME);   // jauna spēle sākas no nulles

    /* Iestatījumus nodod arī adresē. Daži pārlūki, atverot
       failus tieši no datora, katrai lapai dod atsevišķu localStorage. */
    const params = new URLSearchParams({
      set: setup.setId,
      teams: JSON.stringify(setup.teams),
      timer: setup.timer,
      double: setup.double ? "1" : "0"
    });
    window.location.href = `spele.html?${params}`;
  });
}

/* =========================================================
   2) SPĒLES LAUKUMS (spele.html)
   ========================================================= */
function initGame() {
  const boardEl = document.getElementById("board");
  const scoreEl = document.getElementById("scoreboard");
  const modalEl = document.getElementById("questionModal");
  const modal = new bootstrap.Modal(modalEl);
  const winnerModal = new bootstrap.Modal(document.getElementById("winnerModal"));

  /* ---------- Iestatījumi un stāvoklis ---------- */
  let setup = VV.load(KEY_SETUP, null);

  /* Ja iestatījumi ir adresē (no spelet.html), tie ir noteicošie */
  const params = new URLSearchParams(window.location.search);
  if (params.has("set") && params.has("teams")) {
    try {
      setup = {
        setId: params.get("set"),
        teams: JSON.parse(params.get("teams")).map(String).slice(0, 6),
        timer: Number(params.get("timer")) || 0,
        double: params.get("double") === "1"
      };
      VV.save(KEY_SETUP, setup);
    } catch (err) {
      /* bojāta adrese: izmanto saglabātos iestatījumus */
    }
  }

  if (!setup || !VV.getSet(setup.setId) || !Array.isArray(setup.teams) || setup.teams.length < 2) {
    /* Ja spēle nav iestatīta, izmanto noklusējumu un parāda paziņojumu */
    setup = { setId: "latvija", teams: ["1. komanda", "2. komanda"], timer: 30, double: true };
    document.getElementById("defaultNotice").classList.remove("d-none");
  }
  const set = VV.getSet(setup.setId);

  let state = VV.load(KEY_GAME, null);
  const sameTeams = state && state.teams.map((t) => t.name).join("|") === setup.teams.join("|");
  if (!state || state.setId !== setup.setId || !sameTeams) {
    state = newState();
  }

  /* Izveido jaunu spēles stāvokli */
  function newState() {
    let double = null;
    if (setup.double) {
      /* Nejauša rūtiņa ar dubultiem punktiem (ne 100 punktu rindā) */
      const col = Math.floor(Math.random() * 5);
      const row = 1 + Math.floor(Math.random() * 4);
      double = `${col}-${row}`;
    }
    return {
      setId: setup.setId,
      teams: setup.teams.map((name) => ({ name, score: 0 })),
      used: [],
      double,
      finished: false
    };
  }

  function saveState() {
    VV.save(KEY_GAME, state);
  }

  /* ---------- Laukuma zīmēšana ---------- */
  document.getElementById("gameTitle").textContent = set.title;

  function renderBoard() {
    boardEl.innerHTML = "";
    /* Kategoriju virsraksti */
    set.categories.forEach((cat) => {
      const head = document.createElement("div");
      head.className = "board-cat";
      head.textContent = cat.name;
      boardEl.appendChild(head);
    });
    /* Rūtiņas pa rindām: vispirms visi 100, tad 200 utt. */
    POINTS.forEach((points, row) => {
      set.categories.forEach((cat, col) => {
        const id = `${col}-${row}`;
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "board-cell";
        cell.textContent = points;
        cell.dataset.id = id;
        if (state.used.includes(id)) {
          cell.classList.add("used");
          cell.disabled = true;
          cell.setAttribute("aria-label", `${cat.name}, ${points}, jau izmantots`);
        } else {
          cell.setAttribute("aria-label", `${cat.name} par ${points} punktiem`);
        }
        cell.addEventListener("click", () => openQuestion(col, row));
        boardEl.appendChild(cell);
      });
    });
  }

  /* ---------- Punktu tabula ---------- */
  function renderScores(flashIndex) {
    scoreEl.innerHTML = "";
    state.teams.forEach((team, i) => {
      const box = document.createElement("div");
      box.className = "team-score" + (i === flashIndex ? " flash" : "");
      box.innerHTML = `
        <div class="team-name">${VV.escapeHtml(team.name)}</div>
        <div class="team-points ${team.score < 0 ? "negative" : ""}">${team.score}</div>`;
      scoreEl.appendChild(box);
    });
  }

  /* ---------- Jautājuma logs ---------- */
  let current = null;     // pašreiz atvērtais jautājums
  let timerId = null;

  function openQuestion(col, row) {
    const id = `${col}-${row}`;
    if (state.used.includes(id)) {
      return;
    }
    const cat = set.categories[col];
    const isDouble = state.double === id;
    current = {
      id,
      points: POINTS[row] * (isDouble ? 2 : 1),
      revealed: false,
      awarded: false
    };

    modalEl.querySelector(".modal-title").textContent = `${cat.name} · ${POINTS[row]}`;
    modalEl.querySelector(".double-badge").classList.toggle("d-none", !isDouble);
    modalEl.querySelector(".question-text").textContent = cat.questions[row].q;
    const answer = modalEl.querySelector(".answer-text");
    answer.textContent = cat.questions[row].a;
    answer.classList.add("d-none");
    document.getElementById("revealBtn").classList.remove("d-none");
    document.getElementById("awardBox").classList.add("d-none");
    renderAwardButtons();
    modal.show();
    startTimer();
  }

  /* Pogas punktu piešķiršanai katrai komandai */
  function renderAwardButtons() {
    const box = document.getElementById("awardButtons");
    box.innerHTML = "";
    state.teams.forEach((team, i) => {
      const group = document.createElement("div");
      group.className = "btn-group me-2 mb-2";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", team.name);
      group.innerHTML = `
        <button type="button" class="btn btn-gold" data-team="${i}" data-sign="1">
          ${VV.escapeHtml(team.name)} +${current.points}
        </button>
        <button type="button" class="btn btn-outline-light" data-team="${i}" data-sign="-1"
                aria-label="${VV.escapeHtml(team.name)} mīnus ${current.points}">−</button>`;
      box.appendChild(group);
    });
  }

  /* Atbildes parādīšana */
  function reveal() {
    if (!current || current.revealed) {
      return;
    }
    current.revealed = true;
    stopTimer();
    modalEl.querySelector(".answer-text").classList.remove("d-none");
    document.getElementById("revealBtn").classList.add("d-none");
    document.getElementById("awardBox").classList.remove("d-none");
  }
  document.getElementById("revealBtn").addEventListener("click", reveal);

  /* Atstarpes taustiņš arī parāda atbildi */
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && current && !current.revealed && modalEl.classList.contains("show")) {
      event.preventDefault();
      reveal();
    }
  });

  /* Punktu piešķiršana vai atņemšana */
  document.getElementById("awardButtons").addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-team]");
    if (!btn) {
      return;
    }
    const index = Number(btn.dataset.team);
    const sign = Number(btn.dataset.sign);
    state.teams[index].score += sign * current.points;
    renderScores(index);
    if (sign > 0) {
      /* Pareiza atbilde: jautājums ir izspēlēts */
      current.awarded = true;
      modal.hide();
    } else {
      /* Nepareiza atbilde: šai komandai poga vairs nav aktīva */
      btn.disabled = true;
      btn.previousElementSibling.disabled = true;
      saveState();
    }
  });

  /* Kad logs aizvērts: ja atbilde bija parādīta, rūtiņa ir izmantota */
  modalEl.addEventListener("hidden.bs.modal", () => {
    stopTimer();
    if (current && current.revealed) {
      state.used.push(current.id);
      saveState();
      renderBoard();
      checkEnd();
    }
    current = null;
  });

  /* ---------- Taimeris ---------- */
  function startTimer() {
    const wrap = document.getElementById("timerWrap");
    const bar = wrap.querySelector(".progress-bar");
    const label = document.getElementById("timerLabel");
    stopTimer();
    if (!setup.timer) {
      wrap.classList.add("d-none");
      return;
    }
    wrap.classList.remove("d-none");
    let left = setup.timer;
    const update = () => {
      bar.style.width = `${(left / setup.timer) * 100}%`;
      wrap.querySelector(".progress").setAttribute("aria-valuenow", String(left));
      label.textContent = `${left} s`;
    };
    update();
    timerId = setInterval(() => {
      left -= 1;
      update();
      if (left <= 0) {
        stopTimer();
        label.textContent = "Laiks beidzies!";
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  /* ---------- Spēles beigas ---------- */
  function checkEnd() {
    if (state.used.length < 25 || state.finished) {
      return;
    }
    state.finished = true;
    saveState();

    const sorted = [...state.teams].sort((a, b) => b.score - a.score);
    const best = sorted[0].score;
    const winners = sorted.filter((t) => t.score === best).map((t) => t.name);
    document.getElementById("winnerName").textContent =
      winners.length > 1 ? `Neizšķirts: ${winners.join(", ")}` : winners[0];
    document.getElementById("winnerTable").innerHTML = sorted
      .map((t, i) => `<tr><td>${i + 1}.</td><td>${VV.escapeHtml(t.name)}</td><td class="text-end">${t.score}</td></tr>`)
      .join("");

    /* Saglabā rezultātu vēsturē (jaunākais pirmais, ne vairāk kā 20) */
    const history = VV.load(KEY_HISTORY, []);
    history.unshift({
      date: new Date().toISOString(),
      set: set.title,
      winner: winners.join(", "),
      teams: sorted.map((t) => `${t.name} (${t.score})`)
    });
    VV.save(KEY_HISTORY, history.slice(0, 20));
    winnerModal.show();
  }

  /* ---------- Rīku joslas pogas ---------- */
  document.getElementById("restartBtn").addEventListener("click", () => {
    if (window.confirm("Sākt spēli no jauna? Pašreizējie punkti tiks nodzēsti.")) {
      state = newState();
      saveState();
      renderBoard();
      renderScores();
    }
  });

  document.getElementById("playAgainBtn").addEventListener("click", () => {
    state = newState();
    saveState();
    renderBoard();
    renderScores();
    winnerModal.hide();
  });

  /* Pilnekrāna režīms projektoram.
     Pilnekrānā tiek atvērta visa lapa (nevis tikai spēles sadaļa), jo
     Bootstrap jautājuma logs atrodas ārpus spēles sadaļas un citādi
     pilnekrānā nebūtu redzams. Galvene un kājene tiek paslēptas ar CSS. */
  const fullBtn = document.getElementById("fullscreenBtn");
  fullBtn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  });
  document.addEventListener("fullscreenchange", () => {
    const on = Boolean(document.fullscreenElement);
    document.body.classList.toggle("game-fullscreen", on);
    fullBtn.querySelector("span").textContent = on ? "Iziet no pilnekrāna" : "Pilnekrāns";
  });

  /* Pirmā zīmēšana */
  renderBoard();
  renderScores();
  saveState();
}

/* =========================================================
   3) REZULTĀTU VĒSTURE (rezultati.html)
   ========================================================= */
function initHistory() {
  const body = document.getElementById("historyBody");
  const empty = document.getElementById("historyEmpty");
  const clearBtn = document.getElementById("clearHistory");

  function render() {
    const history = VV.load(KEY_HISTORY, []);
    body.innerHTML = "";
    empty.classList.toggle("d-none", history.length > 0);
    clearBtn.classList.toggle("d-none", history.length === 0);
    history.forEach((game) => {
      const date = new Date(game.date).toLocaleDateString("lv-LV", {
        day: "numeric", month: "long", year: "numeric"
      });
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${date}</td>
        <td>${VV.escapeHtml(game.set)}</td>
        <td class="fw-bold">${VV.escapeHtml(game.winner)}</td>
        <td>${game.teams.map((t) => VV.escapeHtml(t)).join("<br>")}</td>`;
      body.appendChild(row);
    });
  }

  clearBtn.addEventListener("click", () => {
    if (window.confirm("Dzēst visu rezultātu vēsturi?")) {
      VV.remove(KEY_HISTORY);
      render();
    }
  });

  render();
}
