const typeColors = {
  Normal: ["#e5e0d4", "#ffffff"],
  Fire: ["#ff9c54", "#fff0d7"],
  Water: ["#66b8ff", "#e2f4ff"],
  Electric: ["#ffe15b", "#fff8cf"],
  Grass: ["#72d06b", "#e6ffdf"],
  Ice: ["#8be0ec", "#ebfbff"],
  Fighting: ["#d46b55", "#ffe6df"],
  Poison: ["#bc7ad6", "#f7e8ff"],
  Ground: ["#d5ab62", "#fff1d5"],
  Flying: ["#9db5ff", "#eef3ff"],
  Psychic: ["#ff84bc", "#ffeaf4"],
  Bug: ["#b7cf4f", "#f6ffd8"],
  Rock: ["#b9a36a", "#f6efd8"],
  Ghost: ["#8370bf", "#eee9ff"],
  Dragon: ["#8267ff", "#eeeaff"],
  Dark: ["#75685f", "#ece7e3"],
  Steel: ["#aeb8c8", "#f0f4fa"],
  Fairy: ["#ff9bd1", "#fff0f8"]
};

const pokemonSeeds = [
  ["Bulbasaur", ["Grass", "Poison"]], ["Ivysaur", ["Grass", "Poison"]], ["Venusaur", ["Grass", "Poison"]],
  ["Charmander", ["Fire"]], ["Charmeleon", ["Fire"]], ["Charizard", ["Fire", "Flying"]],
  ["Squirtle", ["Water"]], ["Wartortle", ["Water"]], ["Blastoise", ["Water"]],
  ["Caterpie", ["Bug"]], ["Metapod", ["Bug"]], ["Butterfree", ["Bug", "Flying"]],
  ["Weedle", ["Bug", "Poison"]], ["Kakuna", ["Bug", "Poison"]], ["Beedrill", ["Bug", "Poison"]],
  ["Pidgey", ["Normal", "Flying"]], ["Pidgeotto", ["Normal", "Flying"]], ["Pidgeot", ["Normal", "Flying"]],
  ["Rattata", ["Normal"]], ["Raticate", ["Normal"]], ["Spearow", ["Normal", "Flying"]], ["Fearow", ["Normal", "Flying"]],
  ["Ekans", ["Poison"]], ["Arbok", ["Poison"]], ["Pikachu", ["Electric"]], ["Raichu", ["Electric"]],
  ["Sandshrew", ["Ground"]], ["Sandslash", ["Ground"]], ["Nidoran♀", ["Poison"]], ["Nidorina", ["Poison"]],
  ["Nidoqueen", ["Poison", "Ground"]], ["Nidoran♂", ["Poison"]], ["Nidorino", ["Poison"]], ["Nidoking", ["Poison", "Ground"]],
  ["Clefairy", ["Fairy"]], ["Clefable", ["Fairy"]], ["Vulpix", ["Fire"]], ["Ninetales", ["Fire"]],
  ["Jigglypuff", ["Normal", "Fairy"]], ["Wigglytuff", ["Normal", "Fairy"]], ["Zubat", ["Poison", "Flying"]],
  ["Golbat", ["Poison", "Flying"]], ["Oddish", ["Grass", "Poison"]], ["Gloom", ["Grass", "Poison"]],
  ["Vileplume", ["Grass", "Poison"]], ["Paras", ["Bug", "Grass"]], ["Parasect", ["Bug", "Grass"]],
  ["Venonat", ["Bug", "Poison"]], ["Venomoth", ["Bug", "Poison"]], ["Diglett", ["Ground"]],
  ["Dugtrio", ["Ground"]], ["Meowth", ["Normal"]], ["Persian", ["Normal"]], ["Psyduck", ["Water"]],
  ["Golduck", ["Water"]], ["Mankey", ["Fighting"]], ["Primeape", ["Fighting"]], ["Growlithe", ["Fire"]],
  ["Arcanine", ["Fire"]], ["Poliwag", ["Water"]], ["Poliwhirl", ["Water"]], ["Poliwrath", ["Water", "Fighting"]],
  ["Abra", ["Psychic"]], ["Kadabra", ["Psychic"]], ["Alakazam", ["Psychic"]], ["Machop", ["Fighting"]],
  ["Machoke", ["Fighting"]], ["Machamp", ["Fighting"]], ["Bellsprout", ["Grass", "Poison"]],
  ["Weepinbell", ["Grass", "Poison"]], ["Victreebel", ["Grass", "Poison"]], ["Tentacool", ["Water", "Poison"]],
  ["Tentacruel", ["Water", "Poison"]], ["Geodude", ["Rock", "Ground"]], ["Graveler", ["Rock", "Ground"]],
  ["Golem", ["Rock", "Ground"]], ["Ponyta", ["Fire"]], ["Rapidash", ["Fire"]], ["Slowpoke", ["Water", "Psychic"]],
  ["Slowbro", ["Water", "Psychic"]], ["Magnemite", ["Electric", "Steel"]], ["Magneton", ["Electric", "Steel"]],
  ["Farfetch'd", ["Normal", "Flying"]], ["Doduo", ["Normal", "Flying"]], ["Dodrio", ["Normal", "Flying"]],
  ["Seel", ["Water"]], ["Dewgong", ["Water", "Ice"]], ["Grimer", ["Poison"]], ["Muk", ["Poison"]],
  ["Shellder", ["Water"]], ["Cloyster", ["Water", "Ice"]], ["Gastly", ["Ghost", "Poison"]],
  ["Haunter", ["Ghost", "Poison"]], ["Gengar", ["Ghost", "Poison"]], ["Onix", ["Rock", "Ground"]],
  ["Drowzee", ["Psychic"]], ["Hypno", ["Psychic"]], ["Krabby", ["Water"]], ["Kingler", ["Water"]]
];

const attackNames = {
  Normal: ["Quick Strike", "Comet Slam"],
  Fire: ["Ember Shot", "Inferno Burst"],
  Water: ["Aqua Jab", "Tidal Crash"],
  Electric: ["Spark", "Thunder Rail"],
  Grass: ["Vine Lash", "Solar Bloom"],
  Ice: ["Frost Clip", "Blizzard Edge"],
  Fighting: ["Knuckle Jab", "Impact Throw"],
  Poison: ["Toxic Sting", "Venom Wave"],
  Ground: ["Mud Shot", "Quake Break"],
  Flying: ["Wing Cut", "Sky Dive"],
  Psychic: ["Mind Tap", "Psy Surge"],
  Bug: ["Needle Tap", "Swarm Rush"],
  Rock: ["Stone Chip", "Boulder Crush"],
  Ghost: ["Shade Touch", "Night Spiral"],
  Dragon: ["Scale Hit", "Dragon Roar"],
  Dark: ["Sneak Bite", "Blackout"],
  Steel: ["Metal Flick", "Iron Drive"],
  Fairy: ["Charm Pop", "Moon Gleam"]
};

const pokemon = pokemonSeeds.map(([name, types], index) => {
  const id = index + 1;
  const stageBoost = id % 3 === 0 ? 28 : id % 3 === 2 ? 14 : 0;
  const typeBoost = types.length > 1 ? 8 : 0;
  const hp = 62 + ((id * 13) % 48) + stageBoost + typeBoost;
  const attack = 34 + ((id * 17) % 46) + Math.floor(stageBoost / 2);
  const defense = 30 + ((id * 11) % 44) + Math.floor(stageBoost / 3);
  const speed = 28 + ((id * 19) % 56);
  const primary = types[0];
  const [light, pale] = typeColors[primary];
  const names = attackNames[primary] || attackNames.Normal;
  return {
    id,
    name,
    types,
    hp,
    attack,
    defense,
    speed,
    rarity: hp + attack > 180 ? "Holo Rare" : hp + attack > 145 ? "Rare" : "Common",
    weakness: weaknessFor(primary),
    retreat: 1 + (defense > 62 ? 1 : 0) + (speed < 45 ? 1 : 0),
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    cardBg: `linear-gradient(150deg, ${light}, ${pale} 62%, #ffffff)`,
    attacks: [
      { name: names[0], cost: 1, damage: Math.max(20, Math.round(attack * 0.58 / 10) * 10) },
      { name: names[1], cost: 2, damage: Math.max(40, Math.round((attack * 0.92 + 8) / 10) * 10) }
    ]
  };
});

const state = {
  query: "",
  type: "All",
  sort: "number",
  saved: new Set(JSON.parse(localStorage.getItem("savedPokemon") || "[]")),
  battle: null
};

const els = {
  grid: document.querySelector("#pokemonGrid"),
  savedGrid: document.querySelector("#savedGrid"),
  search: document.querySelector("#searchInput"),
  typeFilter: document.querySelector("#typeFilter"),
  sortFilter: document.querySelector("#sortFilter"),
  cardCount: document.querySelector("#cardCount"),
  savedCount: document.querySelector("#savedCount"),
  deckPower: document.querySelector("#deckPower"),
  dialog: document.querySelector("#detailDialog"),
  detail: document.querySelector("#detailContent"),
  closeDialog: document.querySelector("#closeDialogButton"),
  randomButton: document.querySelector("#randomButton"),
  clearSaved: document.querySelector("#clearSavedButton"),
  newGame: document.querySelector("#newGameButton"),
  endTurn: document.querySelector("#endTurnButton"),
  draw: document.querySelector("#drawButton"),
  energy: document.querySelector("#energyButton"),
  attackOne: document.querySelector("#attackOneButton"),
  attackTwo: document.querySelector("#attackTwoButton"),
  retreat: document.querySelector("#retreatButton"),
  playerActive: document.querySelector("#playerActive"),
  playerBench: document.querySelector("#playerBench"),
  playerHand: document.querySelector("#playerHand"),
  opponentActive: document.querySelector("#opponentActive"),
  opponentBench: document.querySelector("#opponentBench"),
  playerPrizes: document.querySelector("#playerPrizes"),
  opponentPrizes: document.querySelector("#opponentPrizes"),
  deckCount: document.querySelector("#deckCount"),
  turnOwner: document.querySelector("#turnOwner"),
  battleStatus: document.querySelector("#battleStatus"),
  battleLog: document.querySelector("#battleLog")
};

function weaknessFor(type) {
  const map = {
    Fire: "Water", Water: "Electric", Electric: "Ground", Grass: "Fire", Ice: "Fighting",
    Fighting: "Psychic", Poison: "Ground", Ground: "Water", Flying: "Electric", Psychic: "Dark",
    Bug: "Fire", Rock: "Water", Ghost: "Dark", Dragon: "Ice", Dark: "Fighting",
    Steel: "Fire", Fairy: "Poison", Normal: "Fighting"
  };
  return map[type] || "Normal";
}

function titleCase(value) {
  return value.replace(/\b\w/g, char => char.toUpperCase());
}

function cardTemplate(mon) {
  const saved = state.saved.has(mon.id);
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

function filteredPokemon() {
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

function renderDex() {
  const list = filteredPokemon();
  els.grid.innerHTML = list.length
    ? list.map(cardTemplate).join("")
    : `<div class="empty-state">No cards match that search.</div>`;
  renderStats();
}

function renderSaved() {
  const list = pokemon.filter(mon => state.saved.has(mon.id));
  els.savedGrid.innerHTML = list.length
    ? list.map(cardTemplate).join("")
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
  els.dialog.showModal();
}

function toggleSaved(id) {
  const numberId = Number(id);
  if (state.saved.has(numberId)) {
    state.saved.delete(numberId);
  } else {
    state.saved.add(numberId);
  }
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

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function createBattleCard(mon) {
  return {
    ...mon,
    currentHp: mon.hp,
    energy: 0,
    uid: `${mon.id}-${crypto.randomUUID ? crypto.randomUUID() : Math.random()}`
  };
}

function drawCards(owner, count) {
  for (let i = 0; i < count; i += 1) {
    const card = owner.deck.shift();
    if (card) owner.hand.push(card);
  }
}

function setupPlayer(savedOnly = false) {
  const pool = savedOnly && state.saved.size >= 10 ? pokemon.filter(mon => state.saved.has(mon.id)) : pokemon;
  const deck = shuffle(pool).slice(0, 20).map(createBattleCard);
  const owner = { deck, hand: [], active: null, bench: [], prizes: 3, energyAttached: false, drewThisTurn: false };
  drawCards(owner, 5);
  owner.active = owner.hand.shift();
  owner.bench = owner.hand.splice(0, 3);
  return owner;
}

function newGame() {
  state.battle = {
    player: setupPlayer(true),
    opponent: setupPlayer(false),
    turn: "player",
    over: false,
    log: ["Match started. You go first."]
  };
  renderBattle();
}

function logBattle(message) {
  state.battle.log.unshift(message);
  state.battle.log = state.battle.log.slice(0, 12);
}

function battleCardTemplate(card, options = {}) {
  if (!card) return `<span class="empty-state">Empty</span>`;
  const health = Math.max(0, Math.round((card.currentHp / card.hp) * 100));
  return `
    <article class="battle-card" style="--card-bg: ${card.cardBg}" ${options.uid ? `data-uid="${card.uid}"` : ""}>
      <strong>${card.name}</strong>
      <small>HP ${card.currentHp}/${card.hp} · Energy ${card.energy}</small>
      <img src="${card.image}" alt="${card.name}">
      <small>${card.attacks[0].name} ${card.attacks[0].damage}</small>
      <small>${card.attacks[1].name} ${card.attacks[1].damage}</small>
      <div class="damage-bar" style="--health:${health}%"><i></i></div>
    </article>
  `;
}

function renderBattle() {
  const game = state.battle;
  if (!game) return;
  els.playerActive.innerHTML = battleCardTemplate(game.player.active);
  els.opponentActive.innerHTML = battleCardTemplate(game.opponent.active);
  els.playerBench.innerHTML = game.player.bench.map(card => battleCardTemplate(card, { uid: true })).join("") || `<div class="empty-state">No bench</div>`;
  els.opponentBench.innerHTML = game.opponent.bench.map(card => battleCardTemplate(card)).join("") || `<div class="empty-state">No bench</div>`;
  els.playerHand.innerHTML = game.player.hand.map(card => battleCardTemplate(card, { uid: true })).join("") || `<div class="empty-state">Hand empty</div>`;
  els.playerPrizes.textContent = `Prizes ${game.player.prizes}`;
  els.opponentPrizes.textContent = `Prizes ${game.opponent.prizes}`;
  els.deckCount.textContent = `Deck ${game.player.deck.length}`;
  els.turnOwner.textContent = game.over ? "Game over" : game.turn === "player" ? "Your turn" : "Opponent turn";
  els.battleStatus.textContent = statusText(game);
  els.battleLog.innerHTML = game.log.map(item => `<p>${item}</p>`).join("");
  const playerTurn = game.turn === "player" && !game.over;
  els.draw.disabled = !playerTurn || game.player.drewThisTurn;
  els.energy.disabled = !playerTurn || game.player.energyAttached || !game.player.active;
  els.attackOne.disabled = !playerTurn || !canAttack(game.player.active, 0);
  els.attackTwo.disabled = !playerTurn || !canAttack(game.player.active, 1);
  els.retreat.disabled = !playerTurn || game.player.bench.length === 0 || game.player.active.energy < game.player.active.retreat;
  els.endTurn.disabled = !playerTurn;
}

function statusText(game) {
  if (game.over) return game.player.prizes === 0 ? "You win the match." : "Opponent wins the match.";
  if (game.turn === "opponent") return "Opponent is choosing a play.";
  if (!game.player.active) return "Choose an active Pokémon from your bench.";
  return "Draw, attach energy, attack, or retreat.";
}

function canAttack(card, index) {
  return card && card.energy >= card.attacks[index].cost;
}

function promote(owner) {
  owner.active = owner.bench.shift() || owner.hand.shift() || null;
}

function knockout(attacker, defender, defenderName) {
  attacker.prizes -= 1;
  logBattle(`${defenderName} was knocked out. ${attacker === state.battle.player ? "You took" : "Opponent took"} a prize.`);
  if (attacker.prizes <= 0) {
    state.battle.over = true;
    return;
  }
  promote(defender);
  if (!defender.active) state.battle.over = true;
}

function performAttack(ownerKey, attackIndex) {
  const game = state.battle;
  if (!game || game.over) return;
  const owner = game[ownerKey];
  const targetKey = ownerKey === "player" ? "opponent" : "player";
  const target = game[targetKey];
  const attack = owner.active.attacks[attackIndex];
  if (!canAttack(owner.active, attackIndex)) return;
  const weaknessBonus = target.active.weakness === owner.active.types[0] ? 20 : 0;
  const damage = Math.max(10, attack.damage + weaknessBonus - Math.floor(target.active.defense / 7));
  target.active.currentHp -= damage;
  logBattle(`${ownerKey === "player" ? "Your" : "Opponent's"} ${owner.active.name} used ${attack.name} for ${damage} damage.`);
  if (target.active.currentHp <= 0) knockout(owner, target, target.active.name);
  if (!game.over) {
    game.turn = ownerKey === "player" ? "opponent" : "player";
    startTurn(game.turn);
  }
  renderBattle();
  if (game.turn === "opponent" && !game.over) setTimeout(opponentTurn, 650);
}

function startTurn(ownerKey) {
  const owner = state.battle[ownerKey];
  owner.energyAttached = false;
  owner.drewThisTurn = false;
  drawCards(owner, 1);
  owner.drewThisTurn = true;
}

function opponentTurn() {
  const game = state.battle;
  if (!game || game.over || game.turn !== "opponent") return;
  const ai = game.opponent;
  if (ai.active && !ai.energyAttached) {
    ai.active.energy += 1;
    ai.energyAttached = true;
    logBattle(`Opponent attached energy to ${ai.active.name}.`);
  }
  if (canAttack(ai.active, 1)) performAttack("opponent", 1);
  else if (canAttack(ai.active, 0)) performAttack("opponent", 0);
  else {
    logBattle("Opponent ended the turn.");
    game.turn = "player";
    startTurn("player");
    renderBattle();
  }
}

function setupBattleControls() {
  els.newGame.addEventListener("click", newGame);
  els.draw.addEventListener("click", () => {
    const player = state.battle.player;
    if (player.drewThisTurn) return;
    drawCards(player, 1);
    player.drewThisTurn = true;
    logBattle("You drew a card.");
    renderBattle();
  });
  els.energy.addEventListener("click", () => {
    const player = state.battle.player;
    player.active.energy += 1;
    player.energyAttached = true;
    logBattle(`You attached energy to ${player.active.name}.`);
    renderBattle();
  });
  els.attackOne.addEventListener("click", () => performAttack("player", 0));
  els.attackTwo.addEventListener("click", () => performAttack("player", 1));
  els.endTurn.addEventListener("click", () => {
    state.battle.turn = "opponent";
    startTurn("opponent");
    logBattle("You ended the turn.");
    renderBattle();
    setTimeout(opponentTurn, 650);
  });
  els.retreat.addEventListener("click", () => {
    const player = state.battle.player;
    if (!player.bench.length || player.active.energy < player.active.retreat) return;
    player.active.energy -= player.active.retreat;
    player.bench.push(player.active);
    player.active = player.bench.shift();
    logBattle(`You retreated into ${player.active.name}.`);
    renderBattle();
  });
  els.playerBench.addEventListener("click", event => {
    const card = event.target.closest("[data-uid]");
    if (!card || state.battle.turn !== "player") return;
    const player = state.battle.player;
    const index = player.bench.findIndex(item => item.uid === card.dataset.uid);
    if (index < 0 || player.active) return;
    player.active = player.bench.splice(index, 1)[0];
    renderBattle();
  });
  els.playerHand.addEventListener("click", event => {
    const card = event.target.closest("[data-uid]");
    const player = state.battle.player;
    if (!card || player.bench.length >= 5) return;
    const index = player.hand.findIndex(item => item.uid === card.dataset.uid);
    if (index < 0) return;
    player.bench.push(player.hand.splice(index, 1)[0]);
    logBattle("You played a Pokémon to the bench.");
    renderBattle();
  });
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

setupFilters();
setupNavigation();
setupCardClicks();
setupBattleControls();
renderDex();
renderSaved();
newGame();
