# 🪨 📄 ✂️ Rock Paper Scissors Game

A web-based Rock-Paper-Scissors game where you play against the computer!
Built using **HTML**, **CSS**, and **JavaScript**.
Tracks scores, shows winner screens, and persists your progress using `localStorage`.


![ss1](https://github.com/user-attachments/assets/74ce137a-5f6a-49bd-9c12-8d17bb40f0e5)
![ss2](https://github.com/user-attachments/assets/3dc46281-1837-4211-8fba-9cf7b060f89b)

![ss5](https://github.com/user-attachments/assets/d11e0742-3262-4e84-b227-725e58c11dbf)
![ss3](https://github.com/user-attachments/assets/abf286e0-0fca-4519-9996-0c11ec716520)

---

## 📄 HTML Structure

```html
<body>
  <div class="game-container">

    <div class="header">
      <!-- Title + Scores -->
    </div>

    <div class="choices">
      <!-- Choices for player (rock, paper, scissors) -->
    </div>

    <div class="result-screen hidden">
      <!-- Display round result -->
    </div>

    <div class="final-screen hidden">
      <!-- Display final game result (win/lose) -->
    </div>

  </div>
</body>
```

- **Header**: Always visible. Displays title and live scores.
- **Choices**: Player picks their option.
- **Result Screen**: Shows who won the current round.
- **Final Screen**: Shows who won the entire game.

---

## 💥 Game Description

- The page is divided into three sections:
  - **Header**: Fixed at the top, showing title and dynamic scores.
  - **Game Area (Choices)**: Displays player’s options (`rock`, `paper`, `scissors`).
  - **Result Screens**:
    - One for **round result** (you win/lose/tie against PC).
    - One for **final result** (you won/lost the whole game).

---

## 🔥 Core Game Logic

### 🌟 Initial Game State

```javascript
let scores = {
    computer: 0,
    player: 0
};
```

### 🌟 Choices Setup

```javascript
const gameChoices = ['rock', 'paper', 'scissors'];
```

Each choice button is bound to an event listener:

```javascript
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.dataset.choice;
        playRound(playerChoice);
    });
});
```

---

## ✨ How a Round Works

### 1. Get Random Computer Choice
```javascript
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * gameChoices.length);
    return gameChoices[randomIndex];
}
```

### 2. Determine Round Winner
```javascript
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
```

### 3. Play a Round
```javascript
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    updateScores(winner);

    document.querySelector('.choices').classList.add('hidden');
    resultScreen.classList.remove('hidden');

    playerPick.innerHTML = `<img src="images/${playerChoice}.png" alt="${playerChoice}">`;
    playerPick.style.border = `15px solid ${getBorderColor(playerChoice)}`;

    computerPick.innerHTML = `<img src="images/${computerChoice}.png" alt="${computerChoice}">`;
    computerPick.style.border = `15px solid ${getBorderColor(computerChoice)}`;

    if (winner === 'tie') {
        resultText.textContent = "IT'S A TIE";
    } else if (winner === 'player') {
        resultText.textContent = "YOU WIN AGAINST PC";
    } else {
        resultText.textContent = "YOU LOST AGAINST PC";
    }
}
```

---

## 🧰 Score Updating

```javascript
function updateScores(winner) {
    if (winner === 'player') {
        scores.player++;
    } else if (winner === 'computer') {
        scores.computer++;
    }

    playerScore.textContent = scores.player;
    computerScore.textContent = scores.computer;

    // Save updated scores
    localStorage.setItem('scores', JSON.stringify(scores));

    const nextBtn = document.querySelector('.next-btn');
    if (scores.player > scores.computer) {
        nextBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.add('hidden');
    }
}
```

---

## 🏆 Final Winner Page (Next Button)

When the **Next** button is clicked:

```javascript
nextBtn.addEventListener('click', () => {
    if (scores.player > scores.computer) {
        winnerHeading.textContent = "HURRAY!!";
        winnerSubHeading.textContent = "YOU WON THE GAME";
        winnerTrophy.src = "images/trophy.png";
    } else {
        winnerHeading.textContent = "OOPS!!";
        winnerSubHeading.textContent = "YOU LOST THE GAME";
        winnerTrophy.src = "images/sad.png";
    }

    scores = { player: 0, computer: 0 };
    localStorage.setItem('scores', JSON.stringify(scores));

    playerScore.textContent = scores.player;
    computerScore.textContent = scores.computer;

    resultScreen.classList.add('hidden');
    document.querySelector('.choices').classList.add('hidden');
    winnerScreen.classList.remove('hidden');
});
```

---

## 🎨 Styling

All visual styles and responsiveness are handled inside `styles.css`:
- Smooth transitions
- Winner glow effects
- Floating animated stars
- Consistent responsive layout

---

## 📂 Project Structure

```
/images
    - rock.png
    - paper.png
    - scissors.png
    - trophy.png
    - sad.png
    - Star.png
index.html
styles.css
script.js
```

---

## 🌟 Bonus Features

- Persistent scores with `localStorage`
- Animated stars in final screen
- Fully working Rules modal from every screen
- Next button appears only if player is winning
- Play Again resets everything neatly

---

# 🚀 Ready to Play Rock-Paper-Scissors?
Let's Go! 🚀




 
