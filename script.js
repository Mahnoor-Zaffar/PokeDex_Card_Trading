const typeColors = window.POKEMON_TYPE_COLORS || {};
const rarityRank = window.POKEMON_RARITY_RANK || {};
const pokemon = window.POKEMON_DATA || [];

const els = {
      body: document.body,
      navSearch: document.querySelector("#navSearch"),
      searchToggle: document.querySelector("#searchToggle"),
      searchClear: document.querySelector("#searchClear"),
      themeToggle: document.querySelector("#themeToggle"),
      grid: document.querySelector("#pokemonGrid"),
      search: document.querySelector("#searchInput"),
      typeFilter: document.querySelector("#typeFilter"),
      rarityFilter: document.querySelector("#rarityFilter"),
      sort: document.querySelector("#sortSelect"),
      favoriteFilter: document.querySelector("#favoriteFilter"),
      visibleCount: document.querySelector("#visibleCount"),
      totalCount: document.querySelector("#totalCount"),
      favoriteCount: document.querySelector("#favoriteCount"),
      typeCount: document.querySelector("#typeCount"),
      rareCount: document.querySelector("#rareCount"),
      battlesPlayedCount: document.querySelector("#battlesPlayedCount"),
      modal: document.querySelector("#detailModal"),
      modalContent: document.querySelector("#modalContent"),
      closeModal: document.querySelector("#closeModal"),
      heroFavoriteBtn: document.querySelector("#heroFavoriteBtn")
    };

    const state = {
      query: "",
      type: "all",
      rarity: "all",
      sort: "id",
      view: "all",
      favorites: new Set()
    };

    function readStorage(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    }

    function formatId(id) { return `#${String(id).padStart(3, "0")}`; }
    function typeClass(type) { return type.toLowerCase(); }
    function typeChips(types) {
      return types.map(type => `<button class="type-chip" style="--chip:${typeColors[type]}" type="button" data-type-chip="${type}" aria-label="Filter by ${type} type">${type}</button>`).join("");
    }

    function saveFavorites() {
      localStorage.setItem("noor-pokedex-favorites", JSON.stringify([...state.favorites]));
    }

    function updateCollectionStats() {
      const typeTotal = new Set(pokemon.flatMap(mon => mon.types)).size;
      const rareTotal = pokemon.filter(mon => rarityRank[mon.rarity] >= rarityRank.Rare).length;
      els.totalCount.textContent = pokemon.length;
      els.favoriteCount.textContent = state.favorites.size;
      els.typeCount.textContent = typeTotal;
      els.rareCount.textContent = rareTotal;
      const battleStats = readStorage("noor-battle-stats", {});
      els.battlesPlayedCount.textContent = battleStats.totalBattles || 0;
    }

    function applyFiltersAndSort() {
      const query = state.query.trim().toLowerCase();
      return pokemon.filter(mon => {
        const textMatch = [mon.name, mon.rarity, mon.ability, mon.weakness, ...mon.types].join(" ").toLowerCase().includes(query);
        const typeMatch = state.type === "all" || mon.types.includes(state.type);
        const rarityMatch = state.rarity === "all" || mon.rarity === state.rarity;
        const favoriteMatch = state.view === "all" || state.favorites.has(mon.id);
        return textMatch && typeMatch && rarityMatch && favoriteMatch;
      }).sort((a, b) => {
        if (state.sort === "name") return a.name.localeCompare(b.name);
        if (state.sort === "hp") return b.hp - a.hp;
        if (state.sort === "attack") return b.attack - a.attack;
        if (state.sort === "defense") return b.defense - a.defense;
        if (state.sort === "speed") return b.speed - a.speed;
        if (state.sort === "rarity") return rarityRank[b.rarity] - rarityRank[a.rarity] || a.id - b.id;
        return a.id - b.id;
      });
    }

    function createPokemonCard(mon) {
      const primary = typeClass(mon.types[0]);
      const favorite = state.favorites.has(mon.id);
      return `
          <article class="pokemon-card ${primary}" data-id="${mon.id}">
            <div class="card-head">
              <span class="dex-no">${formatId(mon.id)}</span>
              <span class="rarity-badge">${mon.rarity}</span>
            </div>
            <div class="card-art"><img src="${mon.image}" alt="${mon.name} official artwork" loading="lazy"></div>
            <div class="card-head">
              <h3>${mon.name}</h3>
              <span class="hp-badge">HP ${mon.hp}</span>
            </div>
            <div class="type-row">${typeChips(mon.types)}</div>
            <p class="card-copy">${mon.description}</p>
            <div class="stat-chips">
              <div class="stat-chip"><span>ATK</span><strong>${mon.attack}</strong></div>
              <div class="stat-chip"><span>DEF</span><strong>${mon.defense}</strong></div>
              <div class="stat-chip"><span>SPD</span><strong>${mon.speed}</strong></div>
            </div>
            <div class="card-actions">
              <button class="favorite-btn ${favorite ? "active" : ""}" type="button" data-favorite="${mon.id}" aria-label="${favorite ? "Remove" : "Add"} ${mon.name} favorite">${favorite ? "★" : "☆"}</button>
              <button class="details-btn" type="button" data-details="${mon.id}">Open Card</button>
            </div>
          </article>`;
    }

    function renderCards() {
      const cards = applyFiltersAndSort();
      els.visibleCount.textContent = cards.length;
      els.grid.innerHTML = cards.length ? cards.map(createPokemonCard).join("") : `
        <div class="empty-state">
          No cards match this vault view. Adjust the search, type, rarity, sort, or favorites filter.
        </div>`;
      updateCollectionStats();
    }

    function renderTypeOptions() {
      const types = [...new Set(pokemon.flatMap(mon => mon.types))].sort();
      els.typeFilter.innerHTML = [`<option value="all">All types</option>`, ...types.map(type => `<option value="${type}">${type}</option>`)].join("");
    }

    function renderRarityOptions() {
      const rarities = [...new Set(pokemon.map(mon => mon.rarity))]
        .sort((a, b) => rarityRank[a] - rarityRank[b]);
      els.rarityFilter.innerHTML = [`<option value="all">All rarities</option>`, ...rarities.map(rarity => `<option value="${rarity}">${rarity}</option>`)].join("");
    }

    function populateFilters() {
      renderTypeOptions();
      renderRarityOptions();
    }

    function openPokemonModal(id) {
      const mon = pokemon.find(item => item.id === id);
      if (!mon) return;
      const favorite = state.favorites.has(mon.id);
      els.modalContent.innerHTML = `
        <div class="modal-layout ${typeClass(mon.types[0])}">
          <div class="modal-art"><img src="${mon.image}" alt="${mon.name} official artwork"></div>
          <div class="modal-body">
            <p class="eyebrow">${formatId(mon.id)} · ${mon.rarity}</p>
            <h2>${mon.name}</h2>
            <div class="type-row">${typeChips(mon.types)}</div>
            <div class="meta-grid">
              <div class="meta-card"><span>HP</span><strong>${mon.hp}</strong></div>
              <div class="meta-card"><span>Ability</span><strong>${mon.ability}</strong></div>
              <div class="meta-card"><span>Attack</span><strong>${mon.attack}</strong></div>
              <div class="meta-card"><span>Defense</span><strong>${mon.defense}</strong></div>
              <div class="meta-card"><span>Speed</span><strong>${mon.speed}</strong></div>
              <div class="meta-card"><span>Weakness</span><strong>${mon.weakness}</strong></div>
              <div class="meta-card"><span>Stage</span><strong>${mon.stage}</strong></div>
              <div class="meta-card"><span>Favorite</span><strong>${favorite ? "Saved" : "Not saved"}</strong></div>
            </div>
            <p class="modal-description">${mon.description}</p>
            <button class="primary-btn" type="button" data-favorite="${mon.id}">${favorite ? "Remove Favorite" : "Add Favorite"}</button>
          </div>
        </div>`;
      if (!els.modal.open) els.modal.showModal();
    }

    function toggleFavorite(id) {
      if (state.favorites.has(id)) state.favorites.delete(id);
      else state.favorites.add(id);
      saveFavorites();
      renderCards();
      const activeModal = els.modal.open && pokemon.some(mon => mon.id === id);
      if (activeModal) openPokemonModal(id);
    }

    function applyTheme(theme) {
      els.body.classList.toggle("light", theme === "light");
      els.themeToggle.textContent = theme === "light" ? "Dark" : "Light";
      localStorage.setItem("noor-pokedex-theme", theme);
    }

    function openSearch() {
      els.navSearch.classList.add("open");
      els.searchToggle.setAttribute("aria-label", "Focus search");
      els.search.placeholder = "Search cards";
      requestAnimationFrame(() => els.search.focus());
    }

    function closeSearch() {
      if (state.query) return;
      els.navSearch.classList.remove("open");
      els.searchToggle.setAttribute("aria-label", "Open search");
      els.search.placeholder = "";
    }

    els.navSearch.addEventListener("submit", event => {
      event.preventDefault();
      openSearch();
    });
    els.searchToggle.addEventListener("click", openSearch);
    els.searchClear.addEventListener("click", () => {
      state.query = "";
      els.search.value = "";
      renderCards();
      closeSearch();
      els.searchToggle.focus();
    });
    els.search.addEventListener("input", event => { state.query = event.target.value; renderCards(); });
    els.search.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        state.query = "";
        els.search.value = "";
        renderCards();
        closeSearch();
        els.searchToggle.focus();
      }
    });
    els.search.addEventListener("blur", closeSearch);
    els.typeFilter.addEventListener("change", event => { state.type = event.target.value; renderCards(); });
    els.rarityFilter.addEventListener("change", event => { state.rarity = event.target.value; renderCards(); });
    els.sort.addEventListener("change", event => { state.sort = event.target.value; renderCards(); });
    els.favoriteFilter.addEventListener("change", event => { state.view = event.target.value; renderCards(); });
    els.heroFavoriteBtn.addEventListener("click", () => {
      state.view = "favorites";
      els.favoriteFilter.value = "favorites";
      document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
      renderCards();
    });
    els.themeToggle.addEventListener("click", () => applyTheme(els.body.classList.contains("light") ? "dark" : "light"));
    els.closeModal.addEventListener("click", closePokemonModal);
    els.modal.addEventListener("click", event => { if (event.target === els.modal) closePokemonModal(); });
    els.modal.addEventListener("cancel", () => {
      els.modalContent.innerHTML = "";
    });
    els.grid.addEventListener("click", event => {
      const favoriteButton = event.target.closest("[data-favorite]");
      const detailButton = event.target.closest("[data-details]");
      const typeChip = event.target.closest("[data-type-chip]");
      if (favoriteButton) toggleFavorite(Number(favoriteButton.dataset.favorite));
      if (typeChip) {
        state.type = typeChip.dataset.typeChip;
        els.typeFilter.value = state.type;
        renderCards();
      }
      if (detailButton) openPokemonModal(Number(detailButton.dataset.details));
    });
    els.modalContent.addEventListener("click", event => {
      const favoriteButton = event.target.closest("[data-favorite]");
      const typeChip = event.target.closest("[data-type-chip]");
      if (favoriteButton) toggleFavorite(Number(favoriteButton.dataset.favorite));
      if (typeChip) {
        state.type = typeChip.dataset.typeChip;
        els.typeFilter.value = state.type;
        els.modal.close();
        renderCards();
        document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
      }
    });

    initCollection();

function closePokemonModal() {
  els.modal.close();
  els.modalContent.innerHTML = "";
}

function getFavorites() {
  return new Set(readStorage("noor-pokedex-favorites", []));
}

function setupCollectionEvents() {
  // Events are registered during initial script evaluation to keep direct-open behavior simple.
}

function initCollection() {
  state.favorites = getFavorites();
  populateFilters();
  applyTheme(localStorage.getItem("noor-pokedex-theme") || "dark");
  setupCollectionEvents();
  renderCards();
}
