// --- GESTION DU CURSEUR PERSONNALISÉ ---

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Le petit point suit la souris instantanément
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Le grand cercle suit avec un léger effet de lissage (animation)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { 
        duration: 400, 
        fill: "forwards" 
    });
});

// --- INTERACTIONS AU SURVOL (HOVER) ---

// On récupère tous les éléments qui ont la classe "hover-target"
const hoverTargets = document.querySelectorAll(".hover-target");

hoverTargets.forEach(target => {
    // Quand la souris entre sur l'élément
    target.addEventListener("mouseover", () => {
        cursorOutline.style.width = "80px";
        cursorOutline.style.height = "80px";
        // L'effet de couleur a été supprimé ici pour rester transparent
        cursorOutline.style.backgroundColor = "transparent"; 
    });
    
    // Quand la souris quitte l'élément
    target.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
    });
});

// --- LOGIQUE LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = Array.from(document.querySelectorAll('.stories-showcase img:not(.card-img)')); // On prend tes storyboards
let currentIndex = 0;

images.forEach((img, index) => {
    img.style.cursor = 'none'; // On s'assure que le curseur par défaut disparait
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

// Fermer si on clique à côté de l'image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

const wrapper = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let index = 0;

function updateCarousel() {
    wrapper.style.transform = `translateX(${-index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
});