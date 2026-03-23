const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

const symbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canClick = true;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[array.length - 1]] = [array[array.length - 1], array[i]]; 
        // Note: Simple shuffle logic for now
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initGame() {
    gameBoard.innerHTML = "";
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    canClick = true;
    statusDisplay.innerText = `Trouvez les paires ! Coups : 0`;
    
    const shuffledSymbols = shuffle([...symbols]);
    
    shuffledSymbols.forEach((symbol) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (!canClick || this.classList.contains("flipped") || this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canClick = false;
        moves++;
        statusDisplay.innerText = `Trouvez les paires ! Coups : ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        flippedCards = [];
        canClick = true;

        if (matchedPairs === symbols.length / 2) {
            statusDisplay.innerText = `Gagné en ${moves} coups !`;
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerText = "";
            card2.innerText = "";
            flippedCards = [];
            canClick = true;
        }, 800);
    }
}

resetBtn.addEventListener("click", initGame);
initGame();