let currentIndex = 0;

// ===== Slider =====
function moveSlide(direction) {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function goToSlide(index) {
    currentIndex = index;
    const track = document.getElementById('sliderTrack');
    track.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Create slider dots
function createDots() {
    const dotsContainer = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.slide');
    if (!dotsContainer) return;
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
}

// Auto-play the slider every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);

// ===== Floating Petals =====
function createPetals() {
    const container = document.getElementById('petalsContainer');
    if (!container) return;
    const petalEmojis = ['🌸', '🌺', '💮', '🏵️', '✿', '❀'];

    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (6 + Math.random() * 8) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        petal.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
        container.appendChild(petal);
    }
}

// ===== Scroll Reveal =====
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate wish cards inside
                const cards = entry.target.querySelectorAll('.wish-card');
                cards.forEach(card => card.classList.add('animate-in'));

                // Animate poem lines
                const poem = entry.target.querySelector('.poem-text');
                if (poem) poem.classList.add('animate-poem');

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
}

// ===== Parallax on header =====
function setupParallax() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const headerContent = header.querySelector('.header-content');
        if (headerContent && scrolled < window.innerHeight) {
            headerContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            headerContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    });
}

// ===== Keyboard navigation for slider =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveSlide(-1);
    if (e.key === 'ArrowRight') moveSlide(1);
});

// ===== Touch/Swipe support for slider =====
(function setupSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    const slider = document.querySelector('.slider-wrapper');
    if (!slider) return;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            moveSlide(diff > 0 ? 1 : -1);
        }
    }, { passive: true });
})();

// ===== Song Popup =====
function setupSongPopup() {
    const popup = document.getElementById('songPopup');
    const yesBtn = document.getElementById('popupYes');
    const noBtn = document.getElementById('popupNo');
    const music = document.getElementById('bgMusic');
    if (!popup || !yesBtn || !noBtn || !music) return;

    function closePopup() {
        popup.classList.add('hidden');
        setTimeout(() => popup.remove(), 500);
    }

    yesBtn.addEventListener('click', () => {
        music.volume = 0.4;
        music.play();
        closePopup();
    });

    noBtn.addEventListener('click', () => {
        closePopup();
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    createPetals();
    setupScrollReveal();
    setupParallax();
    setupSongPopup();
});