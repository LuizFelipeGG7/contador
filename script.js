// Contador
const startDate = new Date('2025-05-12');
const daysElement = document.getElementById('daysTogether');
const hoursElement = document.getElementById('hoursTogether');
const minutesElement = document.getElementById('minutesTogether');
const secondsElement = document.getElementById('secondsTogether');

function updateLoveCounter() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}


// Carrossel melhorado
const carouselInner = document.getElementById('carouselInner');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const carouselItems = carouselInner.children;
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// Criar indicadores
const indicatorsContainer = document.createElement('div');
indicatorsContainer.className = 'carousel-indicators';
document.querySelector('.carousel').appendChild(indicatorsContainer);

for (let i = 0; i < carouselItems.length; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'carousel-indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
}

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    updateCarousel();
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Navegação por touch
carouselInner.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselInner.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide(); // Swipe para esquerda
    if (touchEndX > touchStartX + 50) prevSlide(); // Swipe para direita
}

// Auto-rotacionar (opcional)
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pausar auto-rotacionar quando interagir
carouselInner.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
carouselInner.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Iniciar
window.onload = function () {
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);
    updateCarousel();
};

const heartCreate = () =>{
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = "💜";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2+3+"s";
    document.body.appendChild(heart);

}
setInterval(heartCreate,300);