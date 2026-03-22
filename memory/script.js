// --- MEMORY JS ---

const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

// Les symboles des cartes (8 paires)
// Pour ton portfolio, tu remplaceras ces lettres par tes PHOTOGRAPHIES
// ou tes ICÔNES DE PROJETS.
const symbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canClick = true; // Pour empêcher de cliquer pendant la pause

// Mélange des cartes (Algorithme Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialisation du jeu
function initGame() {
    gameBoard.innerHTML = ""; // On vide le plateau
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    canClick = true;
    statusDisplay.innerText = `Trouvez les paires ! Coups : 0`;
    
    // Mélange et génération des cartes
    const shuffledSymbols = shuffle([...symbols]);
    
    shuffledSymbols.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        // card.innerText = symbol; // Le symbole est masqué par le CSS (color: transparent)
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Logique du retournement de carte
function flipCard() {
    if (!canClick) return; // Désactive le clic temporairement
    const selectedCard = this;

    // Empêche de recliquer sur une carte déjà retournée
    if (selectedCard.classList.contains("flipped") || selectedCard.classList.contains("matched")) return;

    selectedCard.classList.add("flipped");
    selectedCard.innerText = selectedCard.dataset.symbol; // Affiche le symbole
    flippedCards.push(selectedCard);

    // Si 2 cartes sont retournées, on vérifie la paire
    if (flippedCards.length === 2) {
        canClick = false; // Bloque les clics pour la comparaison
        moves++;
        statusDisplay.innerText = `Trouvez les paires ! Coups : ${moves}`;
        checkMatch();
    }
}

// Vérification de la paire
function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.dataset.symbol === card2.dataset.symbol) {
        // Paire trouvée !
        card1.classList.add("matched");
        card2.classList.add("matched");
        card1.innerText = ""; // Cache le symbole pour un look plus "terminé"
        card2.innerText = "";
        matchedPairs++;
        flippedCards = [];
        canClick = true;

        if (matchedPairs === symbols.length / 2) {
            alert(`Félicitations ! Vous avez gagné en ${moves} coups !`);
        }
    } else {
        // Pas une paire, on attend un peu avant de les retourner
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerText = ""; // Cache le symbole à nouveau
            card2.innerText = "";
            flippedCards = [];
            canClick = true; // Réactive le clic
        }, 1000); // Pause de 1 seconde
    }
}

// Écouteur pour recommencer
resetBtn.addEventListener("click", initGame);

// Démarre le jeu dès le chargement
initGame();