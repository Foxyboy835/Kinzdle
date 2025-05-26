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
function handleKeyClick(key) {
  const input = document.getElementById("guessInput");
  if (key === "Enter") {
    submitGuess();
  } else if (key === "Del") {
    input.value = input.value.slice(0, -1);
  } else {
    if (input.value.length < currentWord.length) {
      input.value += key;
    }
  }
}

function createKeyboard() {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["Del", "Enter"]
  ];

  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";

  keys.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";

    row.forEach(key => {
      const button = document.createElement("button");
      button.textContent = key;
      button.className = "keyboard-key";
      button.onclick = () => handleKeyClick(key);
      rowDiv.appendChild(button);
    });

    keyboard.appendChild(rowDiv);
  });
}
window.onload = () => {
  createKeyboard();
};
