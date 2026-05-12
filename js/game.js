import { pokemon } from "./pokemon-data.js";

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function createBattleCard(mon) {
  const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  return {
    ...mon,
    currentHp: mon.hp,
    energy: 0,
    uid: `${mon.id}-${id}`
  };
}

function drawCards(owner, count) {
  for (let i = 0; i < count; i += 1) {
    const card = owner.deck.shift();
    if (card) owner.hand.push(card);
  }
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

export function createGameController(state, els) {
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

  function statusText(game) {
    if (game.over) return game.player.prizes === 0 ? "You win the match." : "Opponent wins the match.";
    if (game.turn === "opponent") return "Opponent is choosing a play.";
    if (!game.player.active) return "Choose an active Pokémon from your bench.";
    return "Draw, attach energy, attack, or retreat.";
  }

  function canAttack(card, index) {
    return card && card.energy >= card.attacks[index].cost;
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

  function startTurn(ownerKey) {
    const owner = state.battle[ownerKey];
    owner.energyAttached = false;
    owner.drewThisTurn = false;
    drawCards(owner, 1);
    owner.drewThisTurn = true;
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

  function init() {
    setupBattleControls();
    newGame();
  }

  return { init, newGame, renderBattle };
}
