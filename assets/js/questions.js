// ── Level data: rewards, topics, chest visuals ──
export const rewards = ['💎', '👑', '🏅', '💰', '🌟', '🔮', '🍀', '🎯', '🦄', '🏆'];
export const rewardNames = ['Diamond', 'Crown', 'Medal', 'Gold Coins', 'Star', 'Crystal Orb', 'Lucky Clover', 'Bullseye', 'Unicorn', 'Grand Trophy'];
export const rewardPoints = [100, 120, 140, 160, 200, 240, 280, 320, 400, 500];

export const levelTopics = [
    'Addition', 'Subtraction', 'Multiplication', 'Division',
    'Mixed Ops', 'Exponents', 'Order of Ops', 'Percentages',
    'Equations', 'Ultimate Challenge'
];

export const chestEmojis = ['🔒', '🔒', '🔒', '📦', '📦', '🧰', '🧰', '🎁', '🎁', '👑'];

// ── Generate Question ──
export function generateQuestion(level, difficulty) {
    const diff = difficulty === 'easy' ? 0.6 : difficulty === 'hard' ? 1.5 : 1;
    let a, b, c, q, ans;

    switch (level) {
        case 1: // Addition
            a = Math.floor(Math.random() * (20 * diff)) + 1;
            b = Math.floor(Math.random() * (20 * diff)) + 1;
            q = `${a} + ${b} = ?`;
            ans = a + b;
            break;
        case 2: // Subtraction
            a = Math.floor(Math.random() * (30 * diff)) + 10;
            b = Math.floor(Math.random() * a) + 1;
            q = `${a} − ${b} = ?`;
            ans = a - b;
            break;
        case 3: // Multiplication
            a = Math.floor(Math.random() * (8 * diff)) + 2;
            b = Math.floor(Math.random() * (8 * diff)) + 2;
            q = `${a} × ${b} = ?`;
            ans = a * b;
            break;
        case 4: // Division
            b = Math.floor(Math.random() * (8 * diff)) + 2;
            ans = Math.floor(Math.random() * (10 * diff)) + 1;
            a = b * ans;
            q = `${a} ÷ ${b} = ?`;
            break;
        case 5: // Mixed ops
            a = Math.floor(Math.random() * (15 * diff)) + 2;
            b = Math.floor(Math.random() * (10 * diff)) + 1;
            c = Math.floor(Math.random() * (8 * diff)) + 1;
            if (Math.random() > 0.5) {
                q = `${a} + ${b} × ${c} = ?`;
                ans = a + b * c;
            } else {
                q = `${a} × ${b} − ${c} = ?`;
                ans = a * b - c;
            }
            break;
        case 6: // Exponents
            a = Math.floor(Math.random() * (6 * diff)) + 2;
            b = Math.random() > 0.5 ? 2 : 3;
            q = `${a}^${b} = ?`;
            ans = Math.pow(a, b);
            break;
        case 7: // Order of ops
            a = Math.floor(Math.random() * (8 * diff)) + 1;
            b = Math.floor(Math.random() * (6 * diff)) + 1;
            c = Math.floor(Math.random() * (5 * diff)) + 2;
            q = `(${a} + ${b}) × ${c} = ?`;
            ans = (a + b) * c;
            break;
        case 8: // Percentages
            const pcts = [10, 20, 25, 50];
            b = pcts[Math.floor(Math.random() * pcts.length)];
            a = (Math.floor(Math.random() * (10 * diff)) + 2) * (100 / b);
            q = `${b}% of ${a} = ?`;
            ans = (b / 100) * a;
            break;
        case 9: // Simple equations
            ans = Math.floor(Math.random() * (15 * diff)) + 1;
            b = Math.floor(Math.random() * (8 * diff)) + 2;
            c = ans * b + Math.floor(Math.random() * 10);
            a = c - ans * b;
            q = `${b}x + ${a} = ${c},  x = ?`;
            break;
        case 10: // Ultimate
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                a = Math.floor(Math.random() * (10 * diff)) + 2;
                b = Math.floor(Math.random() * (6 * diff)) + 2;
                c = Math.floor(Math.random() * (5 * diff)) + 1;
                q = `${a} × ${b} + ${c}² = ?`;
                ans = a * b + c * c;
            } else if (type === 1) {
                a = Math.floor(Math.random() * (12 * diff)) + 3;
                b = Math.floor(Math.random() * (6 * diff)) + 2;
                c = Math.floor(Math.random() * (8 * diff)) + 1;
                q = `(${a} + ${c}) × ${b} = ?`;
                ans = (a + c) * b;
            } else {
                a = Math.floor(Math.random() * 5 + 2);
                q = `${a}³ − ${a} = ?`;
                ans = a * a * a - a;
            }
            break;
    }

    return { question: q, answer: Math.round(ans) };
}

export function generateHint(answer) {
    const hints = [
        `The answer is between ${answer - 5} and ${answer + 5}`,
        `The answer is ${answer % 2 === 0 ? 'even' : 'odd'}`,
        `The first digit is ${String(Math.abs(answer))[0]}`,
    ];
    return hints[Math.floor(Math.random() * hints.length)];
}
