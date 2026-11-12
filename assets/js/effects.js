// ── Stars ──
export function createStars() {
    const c = document.getElementById('stars');
    for (let i = 0; i < 80; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.setProperty('--dur', (1.5 + Math.random() * 3) + 's');
        s.style.animationDelay = Math.random() * 3 + 's';
        s.style.width = s.style.height = (2 + Math.random() * 2) + 'px';
        c.appendChild(s);
    }
}

// ── Particles ──
export function spawnParticles() {
    const container = document.getElementById('particles');
    const colors = ['#f5a623', '#ffd700', '#ff6b6b', '#2ecc71', '#a29bfe', '#fd79a8'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = (40 + Math.random() * 20) + '%';
        p.style.top = (30 + Math.random() * 20) + '%';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.setProperty('--dx', (Math.random() - 0.5) * 300 + 'px');
        p.style.setProperty('--dy', (Math.random() - 0.5) * 300 + 'px');
        container.appendChild(p);
        setTimeout(() => p.remove(), 1000);
    }
}

// ── Confetti ──
export function spawnConfetti() {
    const colors = ['#f5a623', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#fd79a8', '#ffd700'];
    for (let i = 0; i < 60; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.left = Math.random() * 100 + '%';
        c.style.top = -20 + 'px';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.setProperty('--fall', (2 + Math.random() * 3) + 's');
        c.style.setProperty('--spin', (360 + Math.random() * 720) + 'deg');
        c.style.animationDelay = Math.random() * 2 + 's';
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        c.style.width = (6 + Math.random() * 8) + 'px';
        c.style.height = (8 + Math.random() * 14) + 'px';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 6000);
    }
}
