import { pokemon } from "./pokemon-data.js";
import { renderPokemonCards, renderPokemonDetailModal, renderTypeFilter, updateVisibleCount } from "./ui.js";

const cardGrid = document.querySelector("#pokemonGrid");
const searchInput = document.querySelector("#searchInput");
const typeFilter = document.querySelector("#typeFilter");
const sortFilter = document.querySelector("#sortFilter");
const visibleCount = document.querySelector("#cardCount");
const detailDialog = document.querySelector("#detailDialog");
const detailContent = document.querySelector("#detailContent");
const closeDialogButton = document.querySelector("#closeDialogButton");

const state = {
  searchTerm: "",
  selectedType: "all",
  sortBy: "number"
};

function sortPokemon(pokemonList, sortBy) {
  const sortedPokemon = [...pokemonList];

  if (sortBy === "name") {
    return sortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "hp") {
    return sortedPokemon.sort((a, b) => b.hp - a.hp);
  }

  if (sortBy === "attack") {
    return sortedPokemon.sort((a, b) => b.attack - a.attack);
  }

  if (sortBy === "speed") {
    return sortedPokemon.sort((a, b) => b.speed - a.speed);
  }

  return sortedPokemon.sort((a, b) => a.id - b.id);
}

function getVisiblePokemon() {
  const searchTerm = state.searchTerm.trim().toLowerCase();

  const filteredPokemon = pokemon.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm);
    const matchesType = state.selectedType === "all" || pokemon.types.includes(state.selectedType);
    return matchesName && matchesType;
  });

  return sortPokemon(filteredPokemon, state.sortBy);
}

function renderCurrentPokemon() {
  const visiblePokemon = getVisiblePokemon();
  renderPokemonCards(visiblePokemon, cardGrid);
  updateVisibleCount(visibleCount, visiblePokemon.length);
}

function setupControlListeners() {
  searchInput?.addEventListener("input", event => {
    state.searchTerm = event.target.value;
    renderCurrentPokemon();
  });

  typeFilter?.addEventListener("change", event => {
    state.selectedType = event.target.value;
    renderCurrentPokemon();
  });

  sortFilter?.addEventListener("change", event => {
    state.sortBy = event.target.value;
    renderCurrentPokemon();
  });
}

function openPokemonDetail(pokemonId) {
  const selectedPokemon = pokemon.find(item => item.id === Number(pokemonId));
  if (!selectedPokemon || !detailDialog) return;

  renderPokemonDetailModal(selectedPokemon, detailContent);
  detailDialog.showModal();
}

function closePokemonDetail() {
  if (!detailDialog?.open) return;
  detailDialog.classList.add("closing");
  detailDialog.addEventListener("animationend", () => {
    detailDialog.classList.remove("closing");
    detailDialog.close();
  }, { once: true });
}

function setupModalListeners() {
  cardGrid?.addEventListener("click", event => {
    const detailsButton = event.target.closest("[data-details]");
    if (!detailsButton) return;
    openPokemonDetail(detailsButton.dataset.details);
  });

  closeDialogButton?.addEventListener("click", closePokemonDetail);

  detailDialog?.addEventListener("click", event => {
    if (event.target === detailDialog) closePokemonDetail();
  });

  detailDialog?.addEventListener("cancel", event => {
    event.preventDefault();
    closePokemonDetail();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTypeFilter(typeFilter, pokemon);
  setupControlListeners();
  setupModalListeners();
  renderCurrentPokemon();
});
