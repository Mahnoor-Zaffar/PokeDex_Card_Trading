function p(id, name, types, hp, attack, defense, speed, rarity, description, evolutionStage, weakness, ability) {
  const typeColors = {
    Normal: ["#e5e0d4", "#ffffff"], Fire: ["#ff9c54", "#fff0d7"], Water: ["#66b8ff", "#e2f4ff"],
    Electric: ["#ffe15b", "#fff8cf"], Grass: ["#72d06b", "#e6ffdf"], Ice: ["#8be0ec", "#ebfbff"],
    Fighting: ["#d46b55", "#ffe6df"], Poison: ["#bc7ad6", "#f7e8ff"], Ground: ["#d5ab62", "#fff1d5"],
    Flying: ["#9db5ff", "#eef3ff"], Psychic: ["#ff84bc", "#ffeaf4"], Bug: ["#b7cf4f", "#f6ffd8"],
    Rock: ["#b9a36a", "#f6efd8"], Ghost: ["#8370bf", "#eee9ff"], Dragon: ["#8267ff", "#eeeaff"],
    Dark: ["#75685f", "#ece7e3"], Steel: ["#aeb8c8", "#f0f4fa"], Fairy: ["#ff9bd1", "#fff0f8"]
  };
  const [light, pale] = typeColors[types[0]] || typeColors.Normal;

  return {
    id, name, types, hp, attack, defense, speed, rarity, description, evolutionStage, weakness, ability,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    cardBg: `linear-gradient(150deg, ${light}, ${pale} 62%, #ffffff)`
  };
}

const pokemon = [
  p(1, "Bulbasaur", ["Grass", "Poison"], 70, 48, 52, 45, "Common", "A dependable seed Pokemon that stores energy in the bulb on its back.", "Basic", "Fire", "Overgrow"),
  p(3, "Venusaur", ["Grass", "Poison"], 128, 84, 88, 64, "Rare", "The flower on its back gathers sunlight to fuel heavy grass attacks.", "Stage 2", "Fire", "Jungle Bloom"),
  p(4, "Charmander", ["Fire"], 64, 56, 44, 60, "Common", "The flame on its tail burns brighter when it is ready to battle.", "Basic", "Water", "Blaze"),
  p(6, "Charizard", ["Fire", "Flying"], 138, 96, 82, 92, "Holo Rare", "It soars through the sky and blasts intense fire from above.", "Stage 2", "Water", "Inferno Wings"),
  p(7, "Squirtle", ["Water"], 68, 48, 64, 43, "Common", "It withdraws into its shell before countering with pressurized water.", "Basic", "Electric", "Torrent"),
  p(9, "Blastoise", ["Water"], 136, 88, 100, 72, "Rare", "Water cannons on its shell fire with enough force to break stone.", "Stage 2", "Electric", "Hydro Cannon"),
  p(12, "Butterfree", ["Bug", "Flying"], 78, 52, 58, 76, "Uncommon", "Its wings scatter sparkling powder that can disorient attackers.", "Stage 2", "Fire", "Compound Eyes"),
  p(18, "Pidgeot", ["Normal", "Flying"], 104, 78, 72, 96, "Rare", "With powerful wings, it creates gusts that can bend tall trees.", "Stage 2", "Electric", "Keen Eye"),
  p(25, "Pikachu", ["Electric"], 72, 64, 48, 98, "Rare", "Electricity builds in its cheeks before it releases a quick shock.", "Basic", "Ground", "Static"),
  p(26, "Raichu", ["Electric"], 98, 88, 64, 110, "Rare", "It channels stored electricity through its tail to stay grounded.", "Stage 1", "Ground", "Surge Surfer"),
  p(34, "Nidoking", ["Poison", "Ground"], 124, 96, 82, 80, "Rare", "Its horn and heavy tail let it smash through tough defenses.", "Stage 2", "Water", "Sheer Force"),
  p(38, "Ninetales", ["Fire"], 106, 82, 78, 106, "Rare", "Its nine tails shimmer with a mysterious flame-like energy.", "Stage 1", "Water", "Flash Fire"),
  p(52, "Meowth", ["Normal"], 64, 52, 42, 90, "Common", "A crafty Pokemon that loves shiny coins and quick strikes.", "Basic", "Fighting", "Pickup"),
  p(54, "Psyduck", ["Water"], 76, 54, 52, 56, "Common", "When its headache peaks, it unleashes unexpected psychic power.", "Basic", "Electric", "Cloud Nine"),
  p(59, "Arcanine", ["Fire"], 124, 104, 84, 96, "Rare", "A noble Pokemon known for its speed, loyalty, and blazing charge.", "Stage 1", "Water", "Intimidate"),
  p(62, "Poliwrath", ["Water", "Fighting"], 118, 86, 94, 72, "Rare", "Its trained muscles let it swim fast and punch even harder.", "Stage 2", "Electric", "Water Absorb"),
  p(65, "Alakazam", ["Psychic"], 96, 58, 64, 112, "Holo Rare", "A master of psychic attacks with a mind sharper than any blade.", "Stage 2", "Dark", "Synchronize"),
  p(68, "Machamp", ["Fighting"], 130, 110, 88, 66, "Rare", "Its four arms can throw rapid punches from every angle.", "Stage 2", "Psychic", "Guts"),
  p(76, "Golem", ["Rock", "Ground"], 128, 102, 118, 48, "Rare", "It rolls down mountains with enough force to shake the ground.", "Stage 2", "Water", "Sturdy"),
  p(80, "Slowbro", ["Water", "Psychic"], 124, 78, 104, 34, "Rare", "Calm and durable, it absorbs hits before answering with psychic force.", "Stage 1", "Electric", "Regenerator"),
  p(82, "Magneton", ["Electric", "Steel"], 94, 74, 90, 78, "Uncommon", "A linked trio that releases magnetic pulses and crackling sparks.", "Stage 1", "Ground", "Magnet Pull"),
  p(94, "Gengar", ["Ghost", "Poison"], 108, 72, 70, 116, "Holo Rare", "It slips through shadows and strikes with eerie ghostly energy.", "Stage 2", "Dark", "Cursed Body"),
  p(95, "Onix", ["Rock", "Ground"], 96, 70, 126, 76, "Uncommon", "Its massive stone body tunnels through earth at surprising speed.", "Basic", "Water", "Rock Head"),
  p(113, "Chansey", ["Normal"], 150, 28, 42, 52, "Rare", "Its gentle nature and high stamina make it excellent support.", "Basic", "Fighting", "Natural Cure"),
  p(121, "Starmie", ["Water", "Psychic"], 96, 82, 82, 112, "Rare", "Its glowing core spins as it launches precise psychic waves.", "Stage 1", "Electric", "Illuminate"),
  p(123, "Scyther", ["Bug", "Flying"], 102, 102, 78, 112, "Rare", "It moves like a green blur and cuts with scythe-like arms.", "Basic", "Fire", "Technician"),
  p(130, "Gyarados", ["Water", "Flying"], 136, 118, 86, 82, "Holo Rare", "A furious sea serpent that overwhelms foes with raw power.", "Stage 1", "Electric", "Intimidate"),
  p(131, "Lapras", ["Water", "Ice"], 132, 82, 86, 66, "Rare", "A gentle swimmer with icy songs and sturdy defensive power.", "Basic", "Electric", "Water Absorb"),
  p(133, "Eevee", ["Normal"], 74, 58, 54, 64, "Common", "Its unstable genetic makeup lets it evolve in many directions.", "Basic", "Fighting", "Adaptability"),
  p(134, "Vaporeon", ["Water"], 128, 78, 82, 66, "Rare", "Its body can blend with water before striking from the current.", "Stage 1", "Electric", "Water Absorb"),
  p(135, "Jolteon", ["Electric"], 92, 84, 72, 122, "Rare", "Its charged fur bristles before releasing sharp electric bursts.", "Stage 1", "Ground", "Volt Absorb"),
  p(136, "Flareon", ["Fire"], 102, 112, 74, 72, "Rare", "It stores heat in its fluffy coat and releases scorching flames.", "Stage 1", "Water", "Flash Fire"),
  p(143, "Snorlax", ["Normal"], 160, 106, 92, 32, "Holo Rare", "A massive Pokemon that shrugs off hits and counters with heavy force.", "Basic", "Fighting", "Thick Fat"),
  p(144, "Articuno", ["Ice", "Flying"], 122, 88, 100, 88, "Legendary", "This legendary bird freezes the air with every elegant wingbeat.", "Legendary", "Rock", "Pressure"),
  p(145, "Zapdos", ["Electric", "Flying"], 122, 96, 88, 100, "Legendary", "A legendary bird that appears with thunderclouds and bright sparks.", "Legendary", "Rock", "Static"),
  p(146, "Moltres", ["Fire", "Flying"], 122, 100, 88, 96, "Legendary", "Its fiery wings leave trails of flame across the sky.", "Legendary", "Rock", "Flame Body"),
  p(149, "Dragonite", ["Dragon", "Flying"], 146, 124, 98, 86, "Holo Rare", "A kindhearted dragon with enough power to circle the globe.", "Stage 2", "Ice", "Inner Focus"),
  p(150, "Mewtwo", ["Psychic"], 148, 112, 96, 124, "Legendary", "A genetically engineered Pokemon with overwhelming psychic power.", "Legendary", "Dark", "Pressure"),
  p(151, "Mew", ["Psychic"], 126, 92, 92, 108, "Mythic", "A mythical Pokemon said to contain the genetic code of all Pokemon.", "Mythic", "Dark", "Synchronize"),
  p(154, "Meganium", ["Grass"], 124, 82, 100, 78, "Rare", "The aroma from its petals can calm aggression during battle.", "Stage 2", "Fire", "Leaf Guard"),
  p(157, "Typhlosion", ["Fire"], 126, 96, 84, 100, "Rare", "It creates explosive heat waves when its flames flare up.", "Stage 2", "Water", "Blaze"),
  p(160, "Feraligatr", ["Water"], 130, 104, 96, 78, "Rare", "It lunges forward with crushing jaws and unstoppable momentum.", "Stage 2", "Electric", "Torrent"),
  p(181, "Ampharos", ["Electric"], 116, 88, 86, 64, "Rare", "Its tail shines like a beacon and stores steady electric power.", "Stage 2", "Ground", "Static"),
  p(196, "Espeon", ["Psychic"], 96, 76, 74, 116, "Rare", "It reads air currents and enemy intent with its sensitive fur.", "Stage 1", "Dark", "Magic Bounce"),
  p(197, "Umbreon", ["Dark"], 112, 74, 104, 76, "Rare", "Its rings glow in darkness before it launches a patient counterattack.", "Stage 1", "Fighting", "Synchronize"),
  p(208, "Steelix", ["Steel", "Ground"], 128, 96, 138, 42, "Rare", "A hardened steel serpent that tunnels deeper than Onix ever could.", "Stage 1", "Fire", "Sturdy"),
  p(212, "Scizor", ["Bug", "Steel"], 112, 116, 104, 70, "Holo Rare", "Its steel claws strike quickly and look heavier than they feel.", "Stage 1", "Fire", "Technician"),
  p(248, "Tyranitar", ["Rock", "Dark"], 148, 126, 116, 72, "Holo Rare", "An armored powerhouse that can change the shape of mountains.", "Stage 2", "Fighting", "Sand Stream"),
  p(254, "Sceptile", ["Grass"], 118, 104, 78, 120, "Rare", "Leaf blades on its arms slash with precise jungle speed.", "Stage 2", "Fire", "Overgrow"),
  p(257, "Blaziken", ["Fire", "Fighting"], 126, 118, 82, 92, "Holo Rare", "It leaps high and lands blazing kicks with explosive force.", "Stage 2", "Water", "Speed Boost"),
  p(260, "Swampert", ["Water", "Ground"], 138, 112, 100, 72, "Rare", "Powerful arms let it swim through rough water and move boulders.", "Stage 2", "Grass", "Torrent"),
  p(282, "Gardevoir", ["Psychic", "Fairy"], 112, 84, 82, 92, "Rare", "It protects trusted trainers with elegant psychic force.", "Stage 2", "Steel", "Trace"),
  p(302, "Sableye", ["Dark", "Ghost"], 82, 78, 86, 52, "Uncommon", "It lurks in caves and uses gem-like eyes to unsettle enemies.", "Basic", "Fairy", "Prankster"),
  p(306, "Aggron", ["Steel", "Rock"], 132, 110, 132, 54, "Rare", "A territorial armored Pokemon that defends mountains with force.", "Stage 2", "Fighting", "Rock Head"),
  p(330, "Flygon", ["Ground", "Dragon"], 118, 100, 86, 108, "Rare", "Its wings stir desert sand into a veil around its attacks.", "Stage 2", "Ice", "Levitate"),
  p(350, "Milotic", ["Water"], 126, 76, 98, 88, "Rare", "A graceful Pokemon whose calm presence can steady an entire team.", "Stage 1", "Electric", "Marvel Scale"),
  p(359, "Absol", ["Dark"], 96, 116, 72, 92, "Rare", "It appears before disasters and strikes with sudden dark power.", "Basic", "Fighting", "Super Luck"),
  p(373, "Salamence", ["Dragon", "Flying"], 140, 128, 92, 104, "Holo Rare", "A dragon that finally gained wings and now battles with joy.", "Stage 2", "Ice", "Intimidate"),
  p(376, "Metagross", ["Steel", "Psychic"], 138, 124, 126, 72, "Holo Rare", "Four brains coordinate its heavy body with machine-like precision.", "Stage 2", "Fire", "Clear Body"),
  p(384, "Rayquaza", ["Dragon", "Flying"], 154, 136, 98, 116, "Legendary", "A sky-dwelling legend that descends with overwhelming dragon power.", "Legendary", "Ice", "Air Lock"),
  p(389, "Torterra", ["Grass", "Ground"], 140, 112, 114, 56, "Rare", "A walking grove whose heavy shell anchors powerful ground attacks.", "Stage 2", "Ice", "Overgrow"),
  p(392, "Infernape", ["Fire", "Fighting"], 120, 108, 82, 116, "Rare", "It mixes nimble martial arts with roaring flames.", "Stage 2", "Water", "Iron Fist"),
  p(395, "Empoleon", ["Water", "Steel"], 126, 98, 106, 72, "Rare", "Steel-edged wings and royal poise make it a durable attacker.", "Stage 2", "Electric", "Torrent"),
  p(445, "Garchomp", ["Dragon", "Ground"], 144, 130, 104, 110, "Holo Rare", "It tears across the ground and air like a living jet.", "Stage 2", "Ice", "Rough Skin"),
  p(448, "Lucario", ["Fighting", "Steel"], 112, 112, 84, 98, "Holo Rare", "It senses aura and shapes that energy into precise combat strikes.", "Stage 1", "Fire", "Inner Focus"),
  p(470, "Leafeon", ["Grass"], 102, 94, 104, 94, "Rare", "Its leaf-like body stays fresh in sunlight and cuts cleanly.", "Stage 1", "Fire", "Leaf Guard"),
  p(471, "Glaceon", ["Ice"], 102, 88, 104, 78, "Rare", "It lowers the air temperature to create glittering ice crystals.", "Stage 1", "Fighting", "Snow Cloak"),
  p(497, "Serperior", ["Grass"], 118, 88, 100, 114, "Rare", "Regal and swift, it pressures rivals with piercing confidence.", "Stage 2", "Fire", "Contrary"),
  p(500, "Emboar", ["Fire", "Fighting"], 144, 120, 86, 62, "Rare", "It charges with wrestling power and a blazing beard of fire.", "Stage 2", "Water", "Reckless"),
  p(503, "Samurott", ["Water"], 126, 108, 92, 76, "Rare", "A disciplined fighter that draws shell blades in a flash.", "Stage 2", "Electric", "Torrent"),
  p(571, "Zoroark", ["Dark"], 104, 112, 72, 106, "Rare", "It creates illusions to mislead foes before striking from hiding.", "Stage 1", "Fighting", "Illusion"),
  p(612, "Haxorus", ["Dragon"], 128, 134, 96, 98, "Holo Rare", "Its tusks can cleave steel and its battle focus rarely breaks.", "Stage 2", "Ice", "Mold Breaker"),
  p(635, "Hydreigon", ["Dark", "Dragon"], 140, 128, 92, 98, "Holo Rare", "A ruthless three-headed dragon that attacks anything it sees.", "Stage 2", "Fairy", "Levitate"),
  p(658, "Greninja", ["Water", "Dark"], 118, 112, 78, 126, "Holo Rare", "A swift ninja Pokemon that shapes water into cutting stars.", "Stage 2", "Electric", "Battle Bond"),
  p(700, "Sylveon", ["Fairy"], 112, 78, 86, 76, "Rare", "Ribbon-like feelers calm allies and soften enemy aggression.", "Stage 1", "Steel", "Pixilate")
];

const els = {
  grid: document.querySelector("#pokemonGrid"),
  search: document.querySelector("#searchInput"),
  typeFilter: document.querySelector("#typeFilter"),
  sortFilter: document.querySelector("#sortFilter"),
  visibleCount: document.querySelector("#visibleCount"),
  modal: document.querySelector("#detailModal"),
  modalContent: document.querySelector("#modalContent"),
  closeModal: document.querySelector("#closeModalBtn"),
  playerCard: document.querySelector("#playerCard"),
  opponentCard: document.querySelector("#opponentCard"),
  playerHealth: document.querySelector("#playerHealthBar"),
  opponentHealth: document.querySelector("#opponentHealthBar"),
  playerHpText: document.querySelector("#playerHpText"),
  opponentHpText: document.querySelector("#opponentHpText"),
  battleWinner: document.querySelector("#battleWinner"),
  battleLog: document.querySelector("#battleLog"),
  drawBtn: document.querySelector("#drawBattleCardsBtn"),
  startBtn: document.querySelector("#startBattleBtn"),
  attackBtn: document.querySelector("#attackBtn"),
  autoBtn: document.querySelector("#autoBattleBtn"),
  resetBtn: document.querySelector("#resetBattleBtn"),
  battlesPlayed: document.querySelector("#battlesPlayed"),
  wins: document.querySelector("#battleWins"),
  losses: document.querySelector("#battleLosses"),
  winRate: document.querySelector("#battleWinRate"),
  lastWinner: document.querySelector("#lastWinner")
};

const dexState = { search: "", type: "all", sort: "id" };
let battleState = {
  player: null,
  opponent: null,
  playerHp: 0,
  opponentHp: 0,
  active: null,
  started: false,
  over: false,
  autoTimer: null,
  turn: 0
};

function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

function typeClass(type) {
  return `type-${type.toLowerCase()}`;
}

function typeBadges(types) {
  return types.map(type => `<span class="pill ${typeClass(type)}">${type}</span>`).join("");
}

function renderPokemonCards(list) {
  els.grid.innerHTML = list.length ? list.map(mon => `
    <article class="pokemon-card ${typeClass(mon.types[0])}" style="--card-bg:${mon.cardBg}" data-id="${mon.id}">
      <div class="card-top"><span class="dex-no">${formatId(mon.id)}</span><span class="hp">HP ${mon.hp}</span></div>
      <div class="art-frame"><img src="${mon.image}" alt="${mon.name} artwork" loading="lazy"></div>
      <h3>${mon.name}</h3>
      <div class="type-row">${typeBadges(mon.types)}</div>
      <div class="stat-grid">
        <div class="stat-card"><span>Attack</span><strong>${mon.attack}</strong></div>
        <div class="stat-card"><span>Defense</span><strong>${mon.defense}</strong></div>
        <div class="stat-card"><span>Speed</span><strong>${mon.speed}</strong></div>
        <div class="stat-card"><span>Rarity</span><strong>${mon.rarity}</strong></div>
      </div>
      <div class="card-actions">
        <button class="favorite-button" type="button" aria-label="Favorite ${mon.name}">☆</button>
        <button type="button" data-details="${mon.id}">View Details</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">No Pokémon match your search and filters.</div>`;
  els.visibleCount.textContent = list.length;
}

function getVisiblePokemon() {
  const term = dexState.search.trim().toLowerCase();
  const filtered = pokemon.filter(mon => {
    const nameMatch = mon.name.toLowerCase().includes(term);
    const typeMatch = dexState.type === "all" || mon.types.includes(dexState.type);
    return nameMatch && typeMatch;
  });
  return filtered.sort((a, b) => {
    if (dexState.sort === "name") return a.name.localeCompare(b.name);
    if (dexState.sort === "hp") return b.hp - a.hp;
    if (dexState.sort === "attack") return b.attack - a.attack;
    if (dexState.sort === "speed") return b.speed - a.speed;
    return a.id - b.id;
  });
}

function renderTypeFilter() {
  const types = [...new Set(pokemon.flatMap(mon => mon.types))].sort();
  els.typeFilter.innerHTML = [`<option value="all">All Types</option>`, ...types.map(type => `<option value="${type}">${type}</option>`)].join("");
}

function renderModal(mon) {
  els.modalContent.innerHTML = `
    <div class="detail-sheet" style="--card-bg:${mon.cardBg}">
      <div class="detail-art"><img src="${mon.image}" alt="${mon.name} artwork"></div>
      <div class="detail-body">
        <p class="eyebrow">${formatId(mon.id)} · ${mon.rarity}</p>
        <h2>${mon.name}</h2>
        <div class="type-row">${typeBadges(mon.types)}</div>
        <div class="stat-grid">
          <div class="stat-card"><span>HP</span><strong>${mon.hp}</strong></div>
          <div class="stat-card"><span>Attack</span><strong>${mon.attack}</strong></div>
          <div class="stat-card"><span>Defense</span><strong>${mon.defense}</strong></div>
          <div class="stat-card"><span>Speed</span><strong>${mon.speed}</strong></div>
          <div class="stat-card"><span>Ability</span><strong>${mon.ability}</strong></div>
          <div class="stat-card"><span>Weakness</span><strong>${mon.weakness}</strong></div>
          <div class="stat-card"><span>Evolution</span><strong>${mon.evolutionStage}</strong></div>
          <div class="stat-card"><span>Rarity</span><strong>${mon.rarity}</strong></div>
        </div>
        <p class="detail-description">${mon.description}</p>
      </div>
    </div>
  `;
  els.modal.showModal();
}

function renderDex() {
  renderPokemonCards(getVisiblePokemon());
}

function drawRandomPokemon() {
  const randomIndex = Math.floor(Math.random() * pokemon.length);
  return { ...pokemon[randomIndex] };
}

function drawBattleCards() {
  clearInterval(battleState.autoTimer);
  battleState.player = drawRandomPokemon();
  battleState.opponent = drawRandomPokemon();
  battleState.playerHp = battleState.player.hp;
  battleState.opponentHp = battleState.opponent.hp;
  battleState.started = false;
  battleState.over = false;
  battleState.turn = 0;
  battleState.active = null;
  els.battleWinner.textContent = "Cards drawn. Start the battle.";
  els.battleWinner.className = "winner-banner";
  addBattleLog(`Player drew ${battleState.player.name}. Opponent drew ${battleState.opponent.name}.`, true);
  renderBattleCards();
  updateHealthBars();
  updateBattleButtons();
}

function startBattle() {
  if (!battleState.player || !battleState.opponent) drawBattleCards();
  if (battleState.started && !battleState.over) return;
  if (battleState.over) {
    battleState.playerHp = battleState.player.hp;
    battleState.opponentHp = battleState.opponent.hp;
    battleState.turn = 0;
    renderBattleCards();
    updateHealthBars();
  }
  battleState.started = true;
  battleState.over = false;
  battleState.active = battleState.player.speed >= battleState.opponent.speed ? "player" : "opponent";
  els.battleWinner.textContent = `${battleState.active === "player" ? battleState.player.name : battleState.opponent.name} attacks first.`;
  addBattleLog(`Battle started. ${battleState.active === "player" ? battleState.player.name : battleState.opponent.name} is faster and attacks first.`);
  updateBattleButtons();
}

function checkTypeAdvantage(attacker, defender) {
  const rules = {
    Fire: ["Grass"], Grass: ["Water"], Water: ["Fire"], Electric: ["Water"], Psychic: ["Fighting"],
    Fighting: ["Normal"], Ice: ["Dragon"], Dragon: ["Dragon"], Dark: ["Psychic"]
  };
  return attacker.types.some(type => rules[type]?.some(target => defender.types.includes(target)));
}

function calculateDamage(attacker, defender) {
  let damage = Math.max(5, attacker.attack - Math.floor(defender.defense / 2));
  const critical = Math.random() < 0.15;
  const typeAdvantage = checkTypeAdvantage(attacker, defender);
  if (typeAdvantage) damage *= 1.2;
  if (critical) damage *= 1.5;
  return { damage: Math.round(damage), critical, typeAdvantage };
}

function attackTurn() {
  if (!battleState.started || battleState.over) return;

  const attackerKey = battleState.active;
  const defenderKey = attackerKey === "player" ? "opponent" : "player";
  const attacker = battleState[attackerKey];
  const defender = battleState[defenderKey];
  const result = calculateDamage(attacker, defender);

  if (defenderKey === "player") battleState.playerHp = Math.max(0, battleState.playerHp - result.damage);
  else battleState.opponentHp = Math.max(0, battleState.opponentHp - result.damage);

  battleState.turn += 1;
  addBattleLog(`Turn ${battleState.turn}: ${attacker.name} attacked ${defender.name} for ${result.damage} damage.`);
  if (result.critical) addBattleLog(`Critical hit by ${attacker.name}!`);
  if (result.typeAdvantage) addBattleLog(`${attacker.name} has type advantage over ${defender.name}.`);

  animateAttack(attackerKey, defenderKey, result.damage);
  updateHealthBars();

  if (battleState.playerHp <= 0 || battleState.opponentHp <= 0) {
    endBattle();
    return;
  }

  battleState.active = defenderKey;
}

function updateHealthBars() {
  const playerPercent = battleState.player ? Math.max(0, (battleState.playerHp / battleState.player.hp) * 100) : 0;
  const opponentPercent = battleState.opponent ? Math.max(0, (battleState.opponentHp / battleState.opponent.hp) * 100) : 0;
  els.playerHealth.style.width = `${playerPercent}%`;
  els.opponentHealth.style.width = `${opponentPercent}%`;
  els.playerHealth.classList.toggle("low", playerPercent <= 30);
  els.opponentHealth.classList.toggle("low", opponentPercent <= 30);
  els.playerHpText.textContent = battleState.player ? `HP ${battleState.playerHp} / ${battleState.player.hp}` : "HP 0 / 0";
  els.opponentHpText.textContent = battleState.opponent ? `HP ${battleState.opponentHp} / ${battleState.opponent.hp}` : "HP 0 / 0";
  const playerCurrentHp = els.playerCard.querySelector("[data-current-hp]");
  const opponentCurrentHp = els.opponentCard.querySelector("[data-current-hp]");
  if (playerCurrentHp) playerCurrentHp.textContent = battleState.playerHp;
  if (opponentCurrentHp) opponentCurrentHp.textContent = battleState.opponentHp;
}

function addBattleLog(message, clear = false) {
  if (clear) els.battleLog.innerHTML = "";
  const line = document.createElement("p");
  line.textContent = message;
  els.battleLog.prepend(line);
}

function resetBattle() {
  clearInterval(battleState.autoTimer);
  battleState = { player: null, opponent: null, playerHp: 0, opponentHp: 0, active: null, started: false, over: false, autoTimer: null, turn: 0 };
  els.playerCard.className = "battle-card-slot empty-slot";
  els.opponentCard.className = "battle-card-slot empty-slot";
  els.playerCard.textContent = "Draw a player card";
  els.opponentCard.textContent = "Draw an opponent card";
  els.battleWinner.textContent = "Draw cards to begin";
  els.battleWinner.className = "winner-banner";
  els.battleLog.innerHTML = "";
  updateHealthBars();
  updateBattleButtons();
}

function saveBattleStats(winnerKey) {
  const stats = loadBattleStats();
  stats.battlesPlayed += 1;
  if (winnerKey === "player") stats.wins += 1;
  else stats.losses += 1;
  stats.winRate = stats.battlesPlayed ? Math.round((stats.wins / stats.battlesPlayed) * 100) : 0;
  stats.lastWinner = winnerKey === "player" ? battleState.player.name : battleState.opponent.name;
  localStorage.setItem("cardDexBattleStats", JSON.stringify(stats));
  renderBattleStats();
}

function loadBattleStats() {
  return JSON.parse(localStorage.getItem("cardDexBattleStats")) || { battlesPlayed: 0, wins: 0, losses: 0, winRate: 0, lastWinner: "None" };
}

function renderBattleStats() {
  const stats = loadBattleStats();
  els.battlesPlayed.textContent = stats.battlesPlayed;
  els.wins.textContent = stats.wins;
  els.losses.textContent = stats.losses;
  els.winRate.textContent = `${stats.winRate}%`;
  els.lastWinner.textContent = stats.lastWinner;
}

function renderBattleCards() {
  els.playerCard.className = "battle-card-slot";
  els.opponentCard.className = "battle-card-slot";
  els.playerCard.innerHTML = battleCardHTML(battleState.player, battleState.playerHp);
  els.opponentCard.innerHTML = battleCardHTML(battleState.opponent, battleState.opponentHp);
}

function battleCardHTML(mon, currentHp) {
  return `
    <article class="arena-card" style="--card-bg:${mon.cardBg}">
      <img src="${mon.image}" alt="${mon.name} artwork">
      <h3>${mon.name}</h3>
      <div class="type-row">${typeBadges(mon.types)}</div>
      <div class="stat-grid">
        <div class="stat-card"><span>Rarity</span><strong>${mon.rarity}</strong></div>
        <div class="stat-card"><span>Current HP</span><strong data-current-hp>${currentHp}</strong></div>
        <div class="stat-card"><span>Attack</span><strong>${mon.attack}</strong></div>
        <div class="stat-card"><span>Defense</span><strong>${mon.defense}</strong></div>
        <div class="stat-card"><span>Speed</span><strong>${mon.speed}</strong></div>
      </div>
    </article>
  `;
}

function animateAttack(attackerKey, defenderKey, damage) {
  const attackerSlot = attackerKey === "player" ? els.playerCard : els.opponentCard;
  const defenderSlot = defenderKey === "player" ? els.playerCard : els.opponentCard;
  const attackerCard = attackerSlot.querySelector(".arena-card");
  const defenderCard = defenderSlot.querySelector(".arena-card");
  attackerCard?.classList.add("attack-shake");
  setTimeout(() => attackerCard?.classList.remove("attack-shake"), 280);
  if (defenderCard) {
    const popup = document.createElement("span");
    popup.className = "damage-popup";
    popup.textContent = `-${damage}`;
    defenderCard.appendChild(popup);
    setTimeout(() => popup.remove(), 720);
  }
}

function endBattle() {
  battleState.over = true;
  battleState.started = false;
  clearInterval(battleState.autoTimer);
  const winnerKey = battleState.playerHp > 0 ? "player" : "opponent";
  const winner = battleState[winnerKey];
  els.battleWinner.textContent = `${winner.name} wins!`;
  els.battleWinner.className = `winner-banner ${winnerKey === "player" ? "win" : "loss"}`;
  addBattleLog(`Winner: ${winner.name}!`);
  const winnerCard = winnerKey === "player" ? els.playerCard.querySelector(".arena-card") : els.opponentCard.querySelector(".arena-card");
  winnerCard?.classList.add("winner-glow");
  saveBattleStats(winnerKey);
  updateBattleButtons();
}

function startAutoBattle() {
  if (!battleState.started) startBattle();
  clearInterval(battleState.autoTimer);
  attackTurn();
  battleState.autoTimer = setInterval(() => {
    if (battleState.over) {
      clearInterval(battleState.autoTimer);
      return;
    }
    attackTurn();
  }, 850);
}

function updateBattleButtons() {
  els.attackBtn.disabled = !battleState.started || battleState.over;
  els.autoBtn.disabled = !battleState.started || battleState.over;
}

function setupEvents() {
  els.search.addEventListener("input", event => {
    dexState.search = event.target.value;
    renderDex();
  });
  els.typeFilter.addEventListener("change", event => {
    dexState.type = event.target.value;
    renderDex();
  });
  els.sortFilter.addEventListener("change", event => {
    dexState.sort = event.target.value;
    renderDex();
  });
  els.grid.addEventListener("click", event => {
    const details = event.target.closest("[data-details]");
    if (!details) return;
    const mon = pokemon.find(item => item.id === Number(details.dataset.details));
    if (mon) renderModal(mon);
  });
  els.closeModal.addEventListener("click", () => els.modal.close());
  els.modal.addEventListener("click", event => {
    if (event.target === els.modal) els.modal.close();
  });
  els.drawBtn.addEventListener("click", drawBattleCards);
  els.startBtn.addEventListener("click", startBattle);
  els.attackBtn.addEventListener("click", attackTurn);
  els.autoBtn.addEventListener("click", startAutoBattle);
  els.resetBtn.addEventListener("click", resetBattle);
}

renderTypeFilter();
renderDex();
renderBattleStats();
updateHealthBars();
updateBattleButtons();
setupEvents();
