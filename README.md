# 🗝️ Math Treasure Quest

A math puzzle game: solve questions to earn keys, open treasure chests, and clear all 10 levels.
Built with plain HTML5, CSS3 and vanilla JavaScript (ES Modules) — no frameworks, no build step.

## Run with Live Server

The game uses JavaScript ES Modules, which browsers block when a page is opened directly
from disk (`file://`). Serve it over HTTP instead:

1. Open the `project/` folder in **VS Code**.
2. Install the **Live Server** extension (Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server** (or click **Go Live** in the status bar).
4. The game opens at `http://127.0.0.1:5500/`.

Any other static server works too, e.g. `python3 -m http.server` and then visit `http://localhost:8000`.

> The Google Fonts (Fredoka One, Nunito) are loaded from the web, so an internet connection is needed to see the original fonts.

## Project structure

```
project/
├── index.html              HTML structure only
├── assets/
│   ├── css/
│   │   └── style.css       All styles, animations, variables, media queries
│   └── js/
│       ├── main.js         Initialization: stars, inline-handler wiring, Enter-key support
│       ├── game.js         Game state and logic (levels, answers, lives, score, victory/game over)
│       ├── questions.js    Question generation, hints, level topics, rewards, chest emojis
│       ├── effects.js      Stars, particles, confetti
│       └── ui.js           Screen management
└── README.md
```

### Module dependencies

```
main.js ──► game.js ──► questions.js
   │           ├──────► effects.js
   │           └──────► ui.js
   └──────► effects.js
```

## Note on `onclick` handlers

`index.html` keeps its original inline `onclick="..."` attributes unchanged. Because ES module
functions are not global, `main.js` exposes the handlers (`selectDifficulty`, `startGame`,
`restartGame`, `checkAnswer`, `openTreasure`, `nextLevel`) on `window` so those attributes keep working.
