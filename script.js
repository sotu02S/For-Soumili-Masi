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

    for (let i = 0; i < 25; i++) {
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
    const visualizer = document.getElementById('audioVisualizer');

    if (!popup || !yesBtn || !noBtn || !music) return;

    function closePopup() {
        popup.classList.add('hidden');
        setTimeout(() => popup.remove(), 500);
    }

    yesBtn.addEventListener('click', () => {
        music.volume = 0.4;
        music.play();
        if (visualizer) {
            visualizer.classList.remove('hidden');
            visualizer.classList.add('playing');
        }
        shootConfetti();
        closePopup();
    });

    noBtn.addEventListener('click', () => {
        closePopup();
    });
    
    if (visualizer) {
        visualizer.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                visualizer.classList.add('playing');
            } else {
                music.pause();
                visualizer.classList.remove('playing');
            }
        });
    }
}

// ===== Cursor Sparkles =====
function setupCursorSparkles() {
    let lastSparkleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkleTime > 50) {
            createSparkle(e.clientX, e.clientY);
            lastSparkleTime = now;
        }
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        const size = Math.random() * 15 + 10;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        const colors = ['#f48fb1', '#fff8e1', '#f3e5f5', '#81c784'];
        sparkle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%)`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// ===== Confetti Burst =====
function shootConfetti() {
    const colors = ['#f48fb1', '#81c784', '#fff8e1', '#f3e5f5', '#ffb74d'];
    for (let i = 0; i < 70; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    createPetals();
    setupScrollReveal();
    setupParallax();
    setupSongPopup();
    setupCursorSparkles();
});