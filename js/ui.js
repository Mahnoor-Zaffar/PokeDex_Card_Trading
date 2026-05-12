import { pokemon } from "./pokemon-data.js";

function titleCase(value) {
  return value.replace(/\b\w/g, char => char.toUpperCase());
}

function cardTemplate(mon, savedCards) {
  const saved = savedCards.has(mon.id);
  return `
    <article class="pokemon-card" style="--card-bg: ${mon.cardBg}" data-id="${mon.id}" tabindex="0">
      <div class="card-top">
        <span class="dex-no">#${String(mon.id).padStart(3, "0")}</span>
        <span class="hp">HP ${mon.hp}</span>
      </div>
      <h3>${mon.name}</h3>
      <div class="type-row">${mon.types.map(type => `<span class="pill">${type}</span>`).join("")}</div>
      <div class="art-frame"><img src="${mon.image}" alt="${mon.name} artwork" loading="lazy"></div>
      ${mon.attacks.map(attack => `
        <div class="attack-line">
          <strong>${attack.name}</strong>
          <span>${"●".repeat(attack.cost)} ${attack.damage}</span>
        </div>
      `).join("")}
      <div class="card-footer">
        <span class="pill">${mon.rarity}</span>
        <span class="pill">Weak: ${mon.weakness}</span>
      </div>
      <button class="favorite-button ${saved ? "saved" : ""}" type="button" data-save="${mon.id}" aria-label="Save ${mon.name}">${saved ? "★" : "☆"}</button>
    </article>
  `;
}

function filteredPokemon(state) {
  const query = state.query.trim().toLowerCase();
  const list = pokemon.filter(mon => {
    const text = `${mon.name} ${mon.id} ${mon.types.join(" ")}`.toLowerCase();
    return (!query || text.includes(query)) && (state.type === "All" || mon.types.includes(state.type));
  });

  return list.sort((a, b) => {
    if (state.sort === "name") return a.name.localeCompare(b.name);
    if (state.sort === "hp") return b.hp - a.hp;
    if (state.sort === "attack") return b.attack - a.attack;
    if (state.sort === "speed") return b.speed - a.speed;
    return a.id - b.id;
  });
}

export function createUiController(state, els) {
  function renderDex() {
    const list = filteredPokemon(state);
    els.grid.innerHTML = list.length
      ? list.map(mon => cardTemplate(mon, state.saved)).join("")
      : `<div class="empty-state">No cards match that search.</div>`;
    renderStats();
  }

  function renderSaved() {
    const list = pokemon.filter(mon => state.saved.has(mon.id));
    els.savedGrid.innerHTML = list.length
      ? list.map(mon => cardTemplate(mon, state.saved)).join("")
      : `<div class="empty-state">Saved cards will appear here.</div>`;
  }

  function renderStats() {
    els.cardCount.textContent = pokemon.length;
    els.savedCount.textContent = state.saved.size;
    const selected = state.saved.size ? pokemon.filter(mon => state.saved.has(mon.id)) : pokemon.slice(0, 12);
    const power = Math.round(selected.reduce((sum, mon) => sum + mon.hp + mon.attack + mon.defense + mon.speed, 0) / selected.length);
    els.deckPower.textContent = Number.isFinite(power) ? power : 0;
  }

  function openDetail(id) {
    const mon = pokemon.find(item => item.id === Number(id));
    if (!mon) return;
    els.detail.innerHTML = `
      <div class="detail-sheet">
        <div class="detail-art" style="--card-bg: ${mon.cardBg}">
          <img src="${mon.image}" alt="${mon.name} artwork">
        </div>
        <div class="detail-body">
          <p class="eyebrow">#${String(mon.id).padStart(3, "0")} · ${mon.rarity}</p>
          <h2>${mon.name}</h2>
          <div class="type-row">${mon.types.map(type => `<span class="pill">${type}</span>`).join("")}</div>
          <div class="stat-grid">
            ${["hp", "attack", "defense", "speed"].map(stat => `
              <div class="stat-card">
                <span>${titleCase(stat)}</span>
                <strong>${mon[stat]}</strong>
                <div class="meter" style="--value: ${Math.min(100, mon[stat])}%"><i></i></div>
              </div>
            `).join("")}
          </div>
          ${mon.attacks.map(attack => `
            <div class="attack-line">
              <strong>${attack.name}</strong>
              <span>${attack.cost} Energy · ${attack.damage} Damage</span>
            </div>
          `).join("")}
          <p>Weakness: <strong>${mon.weakness}</strong> · Retreat cost: <strong>${mon.retreat}</strong></p>
          <button class="primary-button" type="button" data-save="${mon.id}">${state.saved.has(mon.id) ? "Remove from Saved" : "Save Card"}</button>
        </div>
      </div>
    `;
    if (!els.dialog.open) els.dialog.showModal();
  }

  function toggleSaved(id) {
    const numberId = Number(id);
    if (state.saved.has(numberId)) state.saved.delete(numberId);
    else state.saved.add(numberId);
    localStorage.setItem("savedPokemon", JSON.stringify([...state.saved]));
    renderDex();
    renderSaved();
    renderStats();
    if (els.dialog.open) openDetail(numberId);
  }

  function setupFilters() {
    const types = ["All", ...new Set(pokemon.flatMap(mon => mon.types))].sort((a, b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b));
    els.typeFilter.innerHTML = types.map(type => `<option value="${type}">${type}</option>`).join("");
    els.search.addEventListener("input", event => {
      state.query = event.target.value;
      renderDex();
    });
    els.typeFilter.addEventListener("change", event => {
      state.type = event.target.value;
      renderDex();
    });
    els.sortFilter.addEventListener("change", event => {
      state.sort = event.target.value;
      renderDex();
    });
  }

  function setupNavigation() {
    const links = document.querySelectorAll("[data-view-link]");
    function activate(hash) {
      const viewName = (hash || "#dex").replace("#", "");
      document.querySelectorAll("[data-view]").forEach(view => view.classList.toggle("active", view.dataset.view === viewName));
      links.forEach(link => link.classList.toggle("active", link.dataset.viewLink === viewName));
    }
    window.addEventListener("hashchange", () => activate(location.hash));
    activate(location.hash);
  }

  function setupCardClicks() {
    document.body.addEventListener("click", event => {
      const saveButton = event.target.closest("[data-save]");
      if (saveButton) {
        event.stopPropagation();
        toggleSaved(saveButton.dataset.save);
        return;
      }
      const card = event.target.closest(".pokemon-card");
      if (card) openDetail(card.dataset.id);
    });
    document.body.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      const card = event.target.closest(".pokemon-card");
      if (card) openDetail(card.dataset.id);
    });
    els.closeDialog.addEventListener("click", () => els.dialog.close());
    els.dialog.addEventListener("click", event => {
      if (event.target === els.dialog) els.dialog.close();
    });
    els.randomButton.addEventListener("click", () => openDetail(pokemon[Math.floor(Math.random() * pokemon.length)].id));
    els.clearSaved.addEventListener("click", () => {
      state.saved.clear();
      localStorage.removeItem("savedPokemon");
      renderDex();
      renderSaved();
      renderStats();
    });
  }

  function init() {
    setupFilters();
    setupNavigation();
    setupCardClicks();
    renderDex();
    renderSaved();
  }

  return { init, renderDex, renderSaved, renderStats };
}
