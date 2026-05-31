// Contador de amor
const startDate = new Date('2025-05-12T00:00:00');
const els = {
    days:    document.getElementById('daysTogether'),
    hours:   document.getElementById('hoursTogether'),
    minutes: document.getElementById('minutesTogether'),
    seconds: document.getElementById('secondsTogether'),
};

function pad(n) {
    return String(n).padStart(2, '0');
}

function pop(el) {
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
    el.addEventListener('animationend', () => el.classList.remove('pop'), { once: true });
}

let prevSeconds = -1;

function updateCounter() {
    const diff = Date.now() - startDate.getTime();
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    els.days.textContent    = days;
    els.hours.textContent   = pad(hours);
    els.minutes.textContent = pad(minutes);
    els.seconds.textContent = pad(seconds);

    if (seconds !== prevSeconds) {
        pop(els.seconds);
        if (seconds === 0) pop(els.minutes);
        if (seconds === 0 && minutes === 0) pop(els.hours);
        if (seconds === 0 && minutes === 0 && hours === 0) pop(els.days);
        prevSeconds = seconds;
    }
}

// Carrossel
const carouselInner = document.getElementById('carouselInner');
const dotsContainer = document.getElementById('carouselDots');
const items = carouselInner.children;
let current = 0;
let autoTimer = null;
let touchStartX = 0;

// Criar dots
Array.from(items).forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Foto ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
}

function goTo(index) {
    current = (index + items.length) % items.length;
    carouselInner.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

document.querySelector('.prev').addEventListener('click', () => { resetAuto(); prev(); });
document.querySelector('.next').addEventListener('click', () => { resetAuto(); next(); });

carouselInner.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
carouselInner.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) { resetAuto(); dx < 0 ? next() : prev(); }
});

function startAuto() { autoTimer = setInterval(next, 5000); }
function resetAuto() { clearInterval(autoTimer); startAuto(); }

const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
carousel.addEventListener('mouseleave', startAuto);

// Partículas flutuantes
const EMOJIS = ['❤️', '💕', '💖', '💗', '💓', '🌸', '✨'];
const particlesEl = document.getElementById('particles');
const MAX_PARTICLES = 15;

function spawnParticle() {
    if (particlesEl.children.length >= MAX_PARTICLES) return;
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const dur = 4 + Math.random() * 4;
    el.style.setProperty('--dur', dur + 's');
    el.style.setProperty('--delay', '0s');
    el.style.left = Math.random() * 100 + 'vw';
    el.style.bottom = '-40px';
    el.style.fontSize = (0.9 + Math.random() * 0.8) + 'rem';
    particlesEl.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
}

// Init
updateCounter();
setInterval(updateCounter, 1000);
goTo(0);
startAuto();
setInterval(spawnParticle, 600);