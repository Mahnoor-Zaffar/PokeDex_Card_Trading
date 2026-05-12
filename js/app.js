import { createUiController } from "./ui.js";
import { createGameController } from "./game.js";

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

const ui = createUiController(state, els);
const game = createGameController(state, els);

ui.init();
game.init();
