import { rewards, rewardNames, rewardPoints, levelTopics, chestEmojis, generateQuestion, generateHint } from './questions.js';
import { spawnParticles, spawnConfetti } from './effects.js';
import { showScreen } from './ui.js';

// ── Game State ──
export const state = {
    level: 1,
    maxLevel: 10,
    keys: 0,
    score: 0,
    lives: 3,
    attempts: 0,
    difficulty: 'normal',
    currentAnswer: 0,
    currentQuestion: '',
    hasKey: false,
    startTime: 0,
    wrongStreak: 0,
};

// ── Difficulty ──
export function selectDifficulty(d) {
    state.difficulty = d;
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.diff-btn[data-diff="${d}"]`).classList.add('selected');
}

// ── Game start ──
export function startGame() {
    state.level = 1;
    state.keys = 0;
    state.score = 0;
    state.lives = state.difficulty === 'easy' ? 5 : state.difficulty === 'hard' ? 2 : 3;
    state.attempts = 0;
    state.hasKey = false;
    state.wrongStreak = 0;
    state.startTime = Date.now();
    showScreen('gameScreen');
    loadLevel();
}

export function restartGame() {
    showScreen('startScreen');
}

// ── Load Level ──
export function loadLevel() {
    state.hasKey = false;
    state.wrongStreak = 0;

    // Update HUD
    document.getElementById('hudLevel').textContent = state.level;
    document.getElementById('hudKeys').textContent = state.keys;
    document.getElementById('hudScore').textContent = state.score;
    document.getElementById('hudLives').textContent = state.lives;

    // Progress
    const pct = (state.level / state.maxLevel) * 100;
    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('progressLabel').textContent = `Level ${state.level} of ${state.maxLevel}`;

    // Level badge
    document.getElementById('levelBadge').textContent = `Level ${state.level} — ${levelTopics[state.level - 1]}`;

    // Chest
    document.getElementById('chestEmoji').textContent = chestEmojis[state.level - 1];
    document.getElementById('floatingKey').classList.remove('visible');

    // Generate question
    const { question, answer } = generateQuestion(state.level, state.difficulty);
    state.currentQuestion = question;
    state.currentAnswer = answer;

    document.getElementById('questionText').textContent = question;

    // Reset UI
    document.getElementById('puzzleState').style.display = 'flex';
    document.getElementById('treasureState').style.display = 'none';
    document.getElementById('rewardState').style.display = 'none';
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').className = 'answer-input';
    document.getElementById('feedback').textContent = '';
    document.getElementById('hintText').textContent = '';
    document.getElementById('submitBtn').disabled = false;

    // Focus input
    setTimeout(() => document.getElementById('answerInput').focus(), 100);

    // Card animation
    const card = document.getElementById('gameCard');
    card.style.animation = 'none';
    card.offsetHeight; // reflow
    card.style.animation = 'cardIn .5s ease-out';
}

// ── Check Answer ──
export function checkAnswer() {
    const input = document.getElementById('answerInput');
    const val = parseFloat(input.value);
    state.attempts++;

    if (isNaN(val)) {
        input.className = 'answer-input wrong';
        document.getElementById('feedback').textContent = '⚠️ Please enter a number!';
        document.getElementById('feedback').className = 'feedback error';
        return;
    }

    if (val === state.currentAnswer) {
        // Correct!
        input.className = 'answer-input correct';
        document.getElementById('feedback').textContent = '✅ Correct! You found the key!';
        document.getElementById('feedback').className = 'feedback success';
        document.getElementById('submitBtn').disabled = true;

        state.hasKey = true;
        state.keys++;
        state.wrongStreak = 0;
        document.getElementById('hudKeys').textContent = state.keys;

        // Show floating key
        document.getElementById('floatingKey').classList.add('visible');

        // Chest bounce
        document.getElementById('chestEmoji').classList.add('bounce');

        // Particles
        spawnParticles();

        // Transition to treasure state
        setTimeout(() => {
            document.getElementById('puzzleState').style.display = 'none';
            document.getElementById('treasureState').style.display = 'flex';
        }, 1200);
    } else {
        // Wrong
        input.className = 'answer-input wrong';
        state.lives--;
        state.wrongStreak++;
        document.getElementById('hudLives').textContent = state.lives;
        document.getElementById('feedback').textContent = `❌ Wrong! ${state.lives > 0 ? 'Try again!' : ''}`;
        document.getElementById('feedback').className = 'feedback error';

        // Hint after 2 wrong
        if (state.wrongStreak >= 2) {
            const hint = generateHint(state.currentAnswer);
            document.getElementById('hintText').textContent = `💡 Hint: ${hint}`;
        }

        if (state.lives <= 0) {
            setTimeout(() => gameOver(), 800);
            return;
        }

        input.value = '';
        setTimeout(() => {
            input.className = 'answer-input';
            input.focus();
        }, 500);
    }
}

// ── Open Treasure ──
export function openTreasure() {
    const chest = document.getElementById('openChest');
    chest.classList.add('open-anim');

    const points = rewardPoints[state.level - 1];
    state.score += points;
    document.getElementById('hudScore').textContent = state.score;

    spawnParticles();

    setTimeout(() => {
        document.getElementById('treasureState').style.display = 'none';
        document.getElementById('rewardState').style.display = 'flex';
        document.getElementById('rewardEmoji').textContent = rewards[state.level - 1];
        document.getElementById('rewardText').textContent =
            `You found a ${rewardNames[state.level - 1]}! +${points} pts`;

        if (state.level >= state.maxLevel) {
            document.getElementById('nextBtn').textContent = '🏆 Claim Victory!';
        }
    }, 900);
}

// ── Next Level ──
export function nextLevel() {
    if (state.level >= state.maxLevel) {
        victory();
        return;
    }

    state.level++;

    // Show transition
    const trans = document.getElementById('levelTransition');
    document.getElementById('levelTransitionText').textContent = `⚔️ Level ${state.level}`;
    trans.classList.add('show');

    setTimeout(() => {
        trans.classList.remove('show');
        loadLevel();
    }, 1200);
}

// ── Victory ──
export function victory() {
    const elapsed = Math.round((Date.now() - state.startTime) / 1000);
    document.getElementById('finalScore').textContent = state.score;
    document.getElementById('finalKeys').textContent = state.keys;
    document.getElementById('finalAttempts').textContent = state.attempts;
    document.getElementById('finalTime').textContent = elapsed < 60 ? elapsed + 's' : Math.floor(elapsed/60) + 'm ' + (elapsed%60) + 's';

    showScreen('victoryScreen');
    spawnConfetti();
}

// ── Game Over ──
export function gameOver() {
    document.getElementById('goScore').textContent = state.score;
    document.getElementById('goLevel').textContent = state.level;
    showScreen('gameOverScreen');
}
