const typeColors = window.POKEMON_TYPE_COLORS || {};
const pokemonData = window.POKEMON_DATA || [];

const els = {
      playerCard: document.querySelector("#playerCard"),
      opponentCard: document.querySelector("#opponentCard"),
      playerHealth: document.querySelector("#playerHealth"),
      opponentHealth: document.querySelector("#opponentHealth"),
      playerHpText: document.querySelector("#playerHpText"),
      opponentHpText: document.querySelector("#opponentHpText"),
      playerMeter: document.querySelector("[aria-label='Player health']"),
      opponentMeter: document.querySelector("[aria-label='Opponent health']"),
      arenaPanel: document.querySelector(".arena-panel"),
      winner: document.querySelector("#winnerBanner"),
      winnerPopup: document.querySelector("#winnerPopup"),
      winnerPopupKicker: document.querySelector("#winnerPopupKicker"),
      winnerPopupTitle: document.querySelector("#winnerPopupTitle"),
      winnerPopupDetail: document.querySelector("#winnerPopupDetail"),
      drawBtn: document.querySelector("#drawBtn"),
      startBtn: document.querySelector("#startBtn"),
      attackBtn: document.querySelector("#attackBtn"),
      autoBtn: document.querySelector("#autoBtn"),
      resetBtn: document.querySelector("#resetBtn")
    };

    const state = {
      player: null,
      opponent: null,
      playerHp: 0,
      opponentHp: 0,
      active: null,
      started: false,
      over: false,
      round: 0,
      autoTimer: null,
      messages: [],
      stats: { totalBattles: 0, playerWins: 0, playerLosses: 0, lastWinner: "None" }
    };

    function readStorage(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    }

    function initBattle() {
      state.stats = { ...state.stats, ...readStorage("noor-battle-stats", {}) };
      updateBattleStatsUI();
      resetBattle();
      document.querySelectorAll(".icon-button").forEach(control => {
        control.addEventListener("click", () => revealControlLabel(control));
      });
      els.winnerPopup.addEventListener("click", hideWinnerPopup);
      document.addEventListener("keydown", event => {
        if (event.key === "Escape") hideWinnerPopup();
      });
      els.drawBtn.addEventListener("click", () => {
        hideWinnerPopup();
        state.player = prepareBattlePokemon(drawRandomPokemon());
        state.opponent = prepareBattlePokemon(drawRandomPokemon(state.player.id));
        state.playerHp = state.player.battleHp;
        state.opponentHp = state.opponent.battleHp;
        state.started = false;
        state.over = false;
        state.round = 0;
        state.active = null;
        clearInterval(state.autoTimer);
        state.autoTimer = null;
        els.autoBtn.textContent = "⟳";
        els.autoBtn.setAttribute("aria-label", "Auto Battle");
        els.autoBtn.dataset.label = "Auto Battle";
        renderBattleCard("player", state.player);
        renderBattleCard("opponent", state.opponent);
        updateHealthBars();
        addBattleLog(`Cards drawn: Player gets ${state.player.name}; opponent gets ${state.opponent.name}.`, true);
        els.winner.className = "winner-banner";
        els.winner.textContent = "Cards drawn. Start the battle when ready.";
        els.startBtn.disabled = false;
        els.attackBtn.disabled = true;
        els.autoBtn.disabled = true;
      });
      els.startBtn.addEventListener("click", startBattle);
      els.attackBtn.addEventListener("click", performAttackTurn);
      els.autoBtn.addEventListener("click", () => {
        if (state.autoTimer) {
          clearInterval(state.autoTimer);
          state.autoTimer = null;
          els.autoBtn.textContent = "⟳";
          els.autoBtn.setAttribute("aria-label", "Auto Battle");
          els.autoBtn.dataset.label = "Auto Battle";
          return;
        }
        els.autoBtn.textContent = "Ⅱ";
        els.autoBtn.setAttribute("aria-label", "Pause Auto Battle");
        els.autoBtn.dataset.label = "Pause Auto";
        state.autoTimer = setInterval(performAttackTurn, 1100);
      });
      els.resetBtn.addEventListener("click", resetBattle);
    }

    function revealControlLabel(control) {
      control.classList.add("reveal");
      clearTimeout(control._labelTimer);
      control._labelTimer = setTimeout(() => control.classList.remove("reveal"), 900);
    }

    function getPokemonData() {
      return pokemonData.map(mon => ({ ...mon }));
    }

    function drawRandomPokemon(excludeId) {
      const deck = getPokemonData().filter(mon => mon.id !== excludeId);
      return deck[Math.floor(Math.random() * deck.length)];
    }

    function prepareBattlePokemon(mon) {
      return { ...mon, battleHp: Math.round(mon.hp * 2.35) };
    }

    function renderBattleCard(slot, mon) {
      const target = slot === "player" ? els.playerCard : els.opponentCard;
      target.className = "";
      target.innerHTML = `
        <article class="battle-card ${mon.types[0].toLowerCase()}" data-card="${slot}">
          <div class="card-head">
            <span class="dex-no">#${String(mon.id).padStart(3, "0")}</span>
            <span class="rarity-badge">${mon.rarity}</span>
          </div>
          <div class="card-art"><img src="${mon.image}" alt="${mon.name} official artwork" loading="lazy"></div>
          <div class="card-head">
            <h2>${mon.name}</h2>
            <span class="hp-badge">HP ${mon.battleHp}</span>
          </div>
          <div class="type-row">${mon.types.map(type => `<span class="type-chip" style="--chip:${typeColors[type]}">${type}</span>`).join("")}</div>
          <p class="ability"><strong>Ability:</strong> ${mon.ability}</p>
          <div class="stat-grid">
            <div class="mini-stat"><span>ATK</span><strong>${mon.attack}</strong></div>
            <div class="mini-stat"><span>DEF</span><strong>${mon.defense}</strong></div>
            <div class="mini-stat"><span>SPD</span><strong>${mon.speed}</strong></div>
            <div class="mini-stat"><span>Weak</span><strong>${mon.weakness}</strong></div>
            <div class="mini-stat"><span>Stage</span><strong>${mon.stage}</strong></div>
            <div class="mini-stat"><span>Type</span><strong>${mon.types[0]}</strong></div>
          </div>
        </article>`;
    }

    function startBattle() {
      if (!state.player || !state.opponent) {
        addBattleLog("Draw both cards before starting the battle.");
        return;
      }
      state.started = true;
      state.over = false;
      state.round = 0;
      state.playerHp = state.player.battleHp;
      state.opponentHp = state.opponent.battleHp;
      state.active = state.player.speed >= state.opponent.speed ? "player" : "opponent";
      updateHealthBars();
      addBattleLog(`${state.active === "player" ? state.player.name : state.opponent.name} is faster and attacks first.`);
      els.winner.className = "winner-banner";
      els.winner.textContent = `${state.active === "player" ? "Player" : "Opponent"} has initiative.`;
      els.startBtn.disabled = true;
      els.attackBtn.disabled = false;
      els.autoBtn.disabled = false;
    }

    function performAttackTurn() {
      if (!state.started || state.over) return;
      const attackerKey = state.active;
      const defenderKey = attackerKey === "player" ? "opponent" : "player";
      const attacker = state[attackerKey];
      const defender = state[defenderKey];
      const result = calculateDamage(attacker, defender);

      if (defenderKey === "player") state.playerHp = Math.max(0, state.playerHp - result.damage);
      else state.opponentHp = Math.max(0, state.opponentHp - result.damage);

      state.round += 1;
      const remainingHp = defenderKey === "player" ? state.playerHp : state.opponentHp;
      addBattleLog(`Round ${state.round}: ${attacker.name} attacked ${defender.name} for ${result.damage} damage. ${defender.name} has ${remainingHp} HP remaining.`);
      if (result.critical) addBattleLog(`Critical hit: ${attacker.name}'s damage was multiplied by 1.5.`);
      if (result.typeAdvantage) addBattleLog(`Type advantage: ${attacker.types.join("/")} pressured ${defender.types.join("/")}, adding 20% damage.`);

      showDamagePopup(defenderKey, result.damage);
      document.querySelector(`[data-card="${attackerKey}"]`)?.classList.add("shake");
      document.querySelector(`[data-card="${defenderKey}"]`)?.classList.add("hit");
      const meter = defenderKey === "player" ? els.playerMeter : els.opponentMeter;
      meter.classList.add("hit");
      els.arenaPanel.classList.add("impact");
      setTimeout(() => document.querySelector(`[data-card="${attackerKey}"]`)?.classList.remove("shake"), 320);
      setTimeout(() => document.querySelector(`[data-card="${defenderKey}"]`)?.classList.remove("hit"), 460);
      setTimeout(() => meter.classList.remove("hit"), 380);
      setTimeout(() => els.arenaPanel.classList.remove("impact"), 280);
      updateHealthBars();

      if (state.playerHp <= 0 || state.opponentHp <= 0) {
        endBattle();
        return;
      }

      state.active = defenderKey;
    }

    function calculateDamage(attacker, defender) {
      let damage = Math.max(5, attacker.attack - Math.floor(defender.defense / 2));
      const critical = Math.random() < 0.15;
      const typeAdvantage = checkTypeAdvantage(attacker, defender);
      if (critical) damage *= 1.5;
      if (typeAdvantage) damage *= 1.2;
      return { damage: Math.round(damage), critical, typeAdvantage };
    }

    function checkTypeAdvantage(attacker, defender) {
      const rules = {
        Fire: ["Grass"], Grass: ["Water"], Water: ["Fire"], Electric: ["Water"],
        Psychic: ["Fighting"], Fighting: ["Normal"], Ice: ["Dragon"], Dragon: ["Dragon"],
        Dark: ["Psychic"], Fairy: ["Dragon"], Ground: ["Electric"]
      };
      return attacker.types.some(type => rules[type]?.some(target => defender.types.includes(target)));
    }

    function updateHealthBars() {
      const playerPercent = state.player ? Math.max(0, (state.playerHp / state.player.battleHp) * 100) : 0;
      const opponentPercent = state.opponent ? Math.max(0, (state.opponentHp / state.opponent.battleHp) * 100) : 0;
      els.playerHealth.style.width = `${playerPercent}%`;
      els.opponentHealth.style.width = `${opponentPercent}%`;
      els.playerHealth.classList.toggle("low", playerPercent <= 30);
      els.opponentHealth.classList.toggle("low", opponentPercent <= 30);
      els.playerHpText.textContent = state.player ? `HP ${state.playerHp} / ${state.player.battleHp}` : "HP 0 / 0";
      els.opponentHpText.textContent = state.opponent ? `HP ${state.opponentHp} / ${state.opponent.battleHp}` : "HP 0 / 0";
      els.playerMeter.setAttribute("aria-valuenow", Math.round(playerPercent));
      els.opponentMeter.setAttribute("aria-valuenow", Math.round(opponentPercent));
    }

    function showDamagePopup(targetKey, damage) {
      const zone = targetKey === "player" ? els.playerCard : els.opponentCard;
      const popup = document.createElement("span");
      popup.className = "damage-popup";
      popup.textContent = `-${damage}`;
      zone.appendChild(popup);
      setTimeout(() => popup.remove(), 850);
    }

    function addBattleLog(message, clear = false) {
      if (clear) state.messages = [];
      state.messages.unshift(message);
      state.messages = state.messages.slice(0, 24);
    }

    function endBattle() {
      state.over = true;
      state.started = false;
      stopAutoBattle();
      els.attackBtn.disabled = true;
      els.autoBtn.disabled = true;
      els.startBtn.disabled = true;

      const playerWon = state.opponentHp <= 0;
      const winnerName = playerWon ? state.player.name : state.opponent.name;
      state.stats.totalBattles += 1;
      if (playerWon) state.stats.playerWins += 1;
      else state.stats.playerLosses += 1;
      state.stats.lastWinner = winnerName;
      saveBattleStats();
      updateBattleStatsUI();
      showWinner(playerWon, winnerName);
      addBattleLog(`Winner: ${winnerName}. Match ended after ${state.round} rounds.`);
    }

    function resetBattle() {
      clearInterval(state.autoTimer);
      state.autoTimer = null;
      state.player = null;
      state.opponent = null;
      state.playerHp = 0;
      state.opponentHp = 0;
      state.active = null;
      state.started = false;
      state.over = false;
      state.round = 0;
      hideWinnerPopup();
      els.playerCard.className = "empty-slot";
      els.opponentCard.className = "empty-slot";
      els.playerCard.textContent = "Draw Player Card";
      els.opponentCard.textContent = "Opponent appears after draw";
      els.winner.className = "winner-banner";
      els.winner.textContent = "Draw a card to enter the arena.";
      state.messages = [];
      addBattleLog("Match reset. Draw a new player card to begin.");
      els.startBtn.disabled = true;
      els.attackBtn.disabled = true;
      els.autoBtn.disabled = true;
      els.autoBtn.textContent = "⟳";
      els.autoBtn.setAttribute("aria-label", "Auto Battle");
      els.autoBtn.dataset.label = "Auto Battle";
      updateHealthBars();
    }

    function stopAutoBattle() {
  clearInterval(state.autoTimer);
  state.autoTimer = null;
  els.autoBtn.textContent = "⟳";
  els.autoBtn.setAttribute("aria-label", "Auto Battle");
  els.autoBtn.dataset.label = "Auto Battle";
}

    function saveBattleStats() {
      localStorage.setItem("noor-battle-stats", JSON.stringify(state.stats));
    }

    function updateBattleStatsUI() {
      saveBattleStats();
    }

    function showWinner(playerWon, winnerName) {
      els.winner.className = `winner-banner ${playerWon ? "win" : "loss"}`;
      els.winner.textContent = `${winnerName} wins the match after ${state.round} rounds.`;
      scheduleWinnerPopup(playerWon, winnerName);
    }

    function scheduleWinnerPopup(playerWon, winnerName) {
      clearTimeout(state.popupTimer);
      state.popupTimer = setTimeout(() => {
        showWinnerPopup(playerWon, winnerName);
      }, 5000);
    }

    function showWinnerPopup(playerWon, winnerName) {
      els.winnerPopupKicker.textContent = "Victory";
      els.winnerPopupTitle.textContent = playerWon ? "Player Wins" : "Opponent Wins";
      els.winnerPopupDetail.textContent = `${winnerName} won after ${state.round} rounds`;
      els.winnerPopup.classList.remove("hidden");
    }

    function hideWinnerPopup() {
      els.winnerPopup.classList.add("hidden");
      clearTimeout(state.popupTimer);
    }

    initBattle();