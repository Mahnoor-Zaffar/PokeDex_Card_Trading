const typeClass = type => `type-${type.toLowerCase()}`;

function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

function createTypeBadges(types) {
  return types.map(type => `<span class="pill type-badge ${typeClass(type)}">${type}</span>`).join("");
}

function createStatItem(label, value) {
  return `
    <div class="stat-card">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function createPokemonCard(pokemon) {
  const primaryType = pokemon.types[0];

  return `
    <article class="pokemon-card ${typeClass(primaryType)}" style="--card-bg: ${pokemon.cardBg}" data-id="${pokemon.id}">
      <div class="card-top">
        <span class="dex-no">${formatId(pokemon.id)}</span>
        <span class="hp">HP ${pokemon.hp}</span>
      </div>

      <div class="art-frame">
        <img src="${pokemon.image}" alt="${pokemon.name} official artwork" loading="lazy">
      </div>

      <h3>${pokemon.name}</h3>
      <div class="type-row">${createTypeBadges(pokemon.types)}</div>

      <div class="stat-grid card-stat-grid">
        <div class="stat-card">
          <span>Attack</span>
          <strong>${pokemon.attack}</strong>
        </div>
        <div class="stat-card">
          <span>Defense</span>
          <strong>${pokemon.defense}</strong>
        </div>
        <div class="stat-card">
          <span>Speed</span>
          <strong>${pokemon.speed}</strong>
        </div>
        <div class="stat-card">
          <span>Rarity</span>
          <strong>${pokemon.rarity}</strong>
        </div>
      </div>

      <div class="card-actions">
        <button class="favorite-button" type="button" aria-label="Favorite ${pokemon.name}" data-favorite="${pokemon.id}">☆</button>
        <button class="view-details-button" type="button" data-details="${pokemon.id}">View Details</button>
      </div>
    </article>
  `;
}

export function renderPokemonCards(pokemonList, gridContainer) {
  if (!gridContainer) return;

  gridContainer.innerHTML = pokemonList.length
    ? pokemonList.map(createPokemonCard).join("")
    : `<div class="empty-state">No Pokemon match your current search and filters.</div>`;
}

export function renderTypeFilter(typeFilter, pokemonList) {
  if (!typeFilter) return;

  const types = [...new Set(pokemonList.flatMap(pokemon => pokemon.types))].sort();
  typeFilter.innerHTML = [
    `<option value="all">All Types</option>`,
    ...types.map(type => `<option value="${type}">${type}</option>`)
  ].join("");
}

export function updateVisibleCount(countElement, count) {
  if (!countElement) return;
  countElement.textContent = count;
}

export function renderPokemonDetailModal(pokemon, modalContent) {
  if (!pokemon || !modalContent) return;

  modalContent.innerHTML = `
    <div class="detail-sheet" style="--card-bg: ${pokemon.cardBg}">
      <div class="detail-art">
        <img src="${pokemon.image}" alt="${pokemon.name} official artwork">
      </div>

      <div class="detail-body">
        <p class="eyebrow">${formatId(pokemon.id)} · ${pokemon.rarity}</p>
        <h2>${pokemon.name}</h2>
        <div class="type-row">${createTypeBadges(pokemon.types)}</div>

        <div class="stat-grid">
          ${createStatItem("HP", pokemon.hp)}
          ${createStatItem("Attack", pokemon.attack)}
          ${createStatItem("Defense", pokemon.defense)}
          ${createStatItem("Speed", pokemon.speed)}
          ${createStatItem("Ability", pokemon.ability)}
          ${createStatItem("Weakness", pokemon.weakness)}
          ${createStatItem("Evolution", pokemon.evolutionStage)}
          ${createStatItem("Rarity", pokemon.rarity)}
        </div>

        <p class="detail-description">${pokemon.description}</p>
      </div>
    </div>
  `;
}
