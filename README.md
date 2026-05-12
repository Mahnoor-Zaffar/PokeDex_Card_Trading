# Pokédex TCG Lab

A plain HTML, CSS, and JavaScript Pokédex website with trading-card style Pokémon cards and a simple playable TCG battle mode.

## Project Structure

```text
.
├── index.html
├── css/
│   ├── style.css
│   ├── cards.css
│   └── game.css
├── js/
│   ├── app.js
│   ├── pokemon-data.js
│   ├── ui.js
│   └── game.js
└── assets/
    └── images/
```

## Features

- 99 Pokémon cards generated from local data
- Search, type filter, sorting, and random card detail
- Trading-card UI with animated card hover states
- Saved cards stored in `localStorage`
- Simple Pokémon TCG-style battle with deck, hand, bench, active Pokémon, energy, attacks, retreat, AI turns, and prizes

## Run Locally

Use any static server from the project root:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173
```

JavaScript modules need a local server in most browsers; opening `index.html` directly may block module imports.
