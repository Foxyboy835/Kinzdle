const maxGuesses = 6;
let currentGuessCount = 0;
const answer = "plush"; // You can make this dynamic later
const wordLength = answer.length;

document.documentElement.style.setProperty("--letters", wordLength);

const board = document.getElementById("game-board");

// Create rows
for (let i = 0; i < maxGuesses; i++) {
  const row = document.createElement("div");
  row.classList.add("guess-row");
  for (let j = 0; j < wordLength; j++) {
    const box = document.createElement("div");
    box.classList.add("letter-box");
    row.appendChild(box);
  }
  board.appendChild(row);
}

// Add event listener to the button
document.getElementById("submitButton").addEventListener("click", submitGuess);

function submitGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value.toLowerCase().trim();

  if (guess.length !== wordLength) {
    showMessage("Guess must be " + wordLength + " letters.");
    return;
  }

  if (currentGuessCount >= maxGuesses) return;

  const row = board.children[currentGuessCount];
  for (let i = 0; i < wordLength; i++) {
    const box = row.children[i];
    box.textContent = guess[i];
    if (guess[i] === answer[i]) {
      box.classList.add("correct");
    } else if (answer.includes(guess[i])) {
      box.classList.add("present");
    } else {
      box.classList.add("absent");
    }
  }

  currentGuessCount++;
  document.getElementById("guessCount").textContent = `Guesses: ${currentGuessCount} / ${maxGuesses}`;

  if (guess === answer) {
    showMessage("You got it! 🎉");
    disableInput();
  } else if (currentGuessCount === maxGuesses) {
    showMessage(`Out of tries! The word was: ${answer}`);
    disableInput();
  }

  guessInput.value = "";
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}

function disableInput() {
  document.getElementById("guessInput").disabled = true;
  document.getElementById("submitButton").disabled = true;
}
