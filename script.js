// Game state
let scores = {
    computer: 0,
    player: 0
};

// DOM Elements
const choices = document.querySelectorAll('.choice');
const resultScreen = document.querySelector('.result-screen');
const resultText = document.querySelector('.result-text h2');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const playAgainBtn = document.querySelector('.play-again');
const rulesBtn = document.querySelector('.rules-btn');
const rulesModal = document.querySelector('.rules-modal');
const closeRulesBtn = document.querySelector('.close-rules');
const playerPick = document.querySelector('.player-pick');
const computerPick = document.querySelector('.computer-pick');
const header = document.querySelector('.header'); 

// Game choices
const gameChoices = ['rock', 'paper', 'scissors'];

// Event Listeners
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.dataset.choice;
        playRound(playerChoice);
    });
});

playAgainBtn.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
});

rulesBtn.addEventListener('click', () => {
    rulesModal.classList.remove('hidden');
});

closeRulesBtn.addEventListener('click', () => {
    rulesModal.classList.add('hidden');
});

// Get computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * gameChoices.length);
    return gameChoices[randomIndex];
}

// Determine winner
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'tie';
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    
    return 'computer';
}

function updateNextButtonState() {
    if (scores.player > scores.computer) {
        nextBtn.classList.remove('hidden');
        nextBtn.disabled = false; // Enable the button
    } else {
        nextBtn.classList.add('hidden');
        nextBtn.disabled = true; // Disable the button
    }
}
// Update scores
function updateScores(winner) {
    if (winner === 'player') {
        scores.player++;
    } else if (winner === 'computer') {
        scores.computer++;
    }

    // Update score display
    playerScore.textContent = scores.player;
    computerScore.textContent = scores.computer;
    updateNextButtonState();
    // Save updated scores to localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
}

function getBorderColor(choice) {
    if (choice === 'rock') return '#0074B6';
    if (choice === 'paper') return '#FFA943';
    if (choice === 'scissors') return '#BD00FF';
    return 'white';
}
// Play a round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    
    // Update scores
    updateScores(winner);
    
    // Hide the choices
    document.querySelector('.choices').classList.add('hidden');
    
    
    playerPick.innerHTML = `<img src="images/${playerChoice}.png" alt="${playerChoice}">`;
    playerPick.style.border = `15px solid ${getBorderColor(playerChoice)}`;
    
    computerPick.innerHTML = `<img src="images/${computerChoice}.png" alt="${computerChoice}">`;
    computerPick.style.border = `15px solid ${getBorderColor(computerChoice)}`
    
    // Reset any previous winner classes
    playerPick.parentElement.classList.remove('winner-glow');
    computerPick.parentElement.classList.remove('winner-glow');
    
    // Remove any existing extra rings
    const existingRings = document.querySelectorAll('.extra-ring');
    existingRings.forEach(ring => ring.remove());
    
    // Add winner glow to the result screen
    const extraRing = document.createElement('div');
    extraRing.classList.add('extra-ring');
    
    if (winner === 'tie') {
        resultText.textContent = "IT'S A TIE";
    } else if (winner === 'player') {
        resultText.textContent = "YOU WIN AGAINST PC";
        playerPick.parentElement.classList.add('winner-glow');
        playerPick.parentElement.appendChild(extraRing);
    } else {
        resultText.textContent = "YOU LOST AGAINST PC";
        computerPick.parentElement.classList.add('winner-glow');
        computerPick.parentElement.appendChild(extraRing);
    }
    
    
    
    // Show result screen
    resultScreen.classList.remove('hidden');
}

// Handle Play Again button
playAgainBtn.addEventListener('click', () => {
    // Remove winner glow classes
    document.querySelectorAll('.winner-glow').forEach(el => {
        el.classList.remove('winner-glow');
        const extraRing = el.querySelector('.extra-ring');
        if (extraRing) extraRing.remove();
    });
    
    // Hide result screen and show choices
    resultScreen.classList.add('hidden');
    document.querySelector('.choices').classList.remove('hidden');
});


const savedScores = localStorage.getItem('scores');
if (savedScores) {
    scores = JSON.parse(savedScores);
    playerScore.textContent = scores.player;
    computerScore.textContent = scores.computer;
}
// Next button handler (if you have one)
const nextBtn = document.querySelector('.next-btn');
if (scores.player > scores.computer) {
    nextBtn.classList.remove('hidden');
} else {
    nextBtn.classList.add('hidden');
}



const rulesBtns = document.querySelectorAll('.rules-btn');
rulesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    rulesModal.classList.remove('hidden');
  });
});

const winnerScreen = document.querySelector('.winner-screen');
//const winnerStar = document.querySelector('.star star1');
const winnerContent = document.querySelector('.winner-content');
const winnerHeading = document.querySelector('.winner-content h1');
const winnerSubHeading = document.querySelector('.winner-content h3');
const winnerTrophy = document.querySelector('.winner-trophy');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        // Check who is the winner
        if (scores.player > scores.computer) {
            // Player won
            winnerHeading.textContent = "HURRAY!!";
            winnerSubHeading.textContent = "YOU WON THE GAME";
            winnerTrophy.src = "images/trophy.png"; // Trophy image
        } 

        // Reset scores
        scores = { player: 0, computer: 0 };
        localStorage.setItem('scores', JSON.stringify(scores));

        // Update header display
        playerScore.textContent = scores.player;
        computerScore.textContent = scores.computer;

        // Hide result screen and choices
        resultScreen.classList.add('hidden');
        document.querySelector('.choices').classList.add('hidden');

        // Show winner screen
        winnerScreen.classList.remove('hidden');
    });
}

const winnerPlayAgainBtn = document.querySelector('.play-again-btn');

winnerPlayAgainBtn.addEventListener('click', () => {
    // Hide winner screen
    winnerScreen.classList.add('hidden');
    
    // Show choices again
    document.querySelector('.choices').classList.remove('hidden');
    
    // Hide Next button
    document.querySelector('.next-btn').classList.add('hidden');
});