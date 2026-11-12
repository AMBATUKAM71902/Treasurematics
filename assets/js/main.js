import { createStars } from './effects.js';
import { selectDifficulty, startGame, restartGame, checkAnswer, openTreasure, nextLevel } from './game.js';

// ── Stars ──
createStars();

// Inline onclick="..." handlers in index.html call these by name,
// so they are exposed on window (ES module scope is not global).
Object.assign(window, { selectDifficulty, startGame, restartGame, checkAnswer, openTreasure, nextLevel });

// ── Enter key support ──
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const btn = document.getElementById('submitBtn');
        if (btn && !btn.disabled && document.getElementById('puzzleState').style.display !== 'none') {
            checkAnswer();
        }
    }
});
