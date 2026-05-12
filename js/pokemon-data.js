export const typeColors = {
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

function weaknessFor(type) {
  const map = {
    Fire: "Water", Water: "Electric", Electric: "Ground", Grass: "Fire", Ice: "Fighting",
    Fighting: "Psychic", Poison: "Ground", Ground: "Water", Flying: "Electric", Psychic: "Dark",
    Bug: "Fire", Rock: "Water", Ghost: "Dark", Dragon: "Ice", Dark: "Fighting",
    Steel: "Fire", Fairy: "Poison", Normal: "Fighting"
  };
  return map[type] || "Normal";
}

export const pokemon = pokemonSeeds.map(([name, types], index) => {
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
