// --- GESTION DU CURSEUR PERSONNALISÉ ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { 
        duration: 400, 
        fill: "forwards" 
    });
});

// --- INTERACTIONS AU SURVOL (HOVER) ---
const hoverTargets = document.querySelectorAll(".hover-target");

hoverTargets.forEach(target => {
    target.addEventListener("mouseover", () => {
        cursorOutline.style.width = "80px";
        cursorOutline.style.height = "80px";
        cursorOutline.style.backgroundColor = "transparent"; 
    });
    
    target.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
    });
});

// --- LOGIQUE LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = Array.from(document.querySelectorAll('.stories-showcase img:not(.card-img)'));
let currentIndex = 0;

if (lightbox) {
    images.forEach((img, index) => {
        img.style.cursor = 'none';
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            currentIndex = index;
        });
    });

    document.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    document.querySelector('.lightbox-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    });

    document.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });
}

// --- LOGIQUE CARROUSEL ---
const wrapper = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

if (wrapper && slides.length > 0) {
    let slideIndex = 0;

    function updateCarousel() {
        wrapper.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });
}

// --- LOGIQUE MENU BURGER (UNIQUE ET NETTOYÉE) ---
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');

    if (burger && navLinks) {
        // Au clic sur le burger
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Ouvre/ferme le menu
            burger.classList.toggle('toggle');   // Anime le burger en X
        });

        // Ferme le menu automatiquement quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    }
});