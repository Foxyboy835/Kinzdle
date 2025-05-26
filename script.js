const maxGuesses = 6;
let currentGuessCount = 0;
const answer = "plush"; // You can make this dynamic later
const wordLength = answer.length;

document.documentElement.style.setProperty("--letters", wordLength);

const board = document.getElementById("game-board");
let currentGuess = "";

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

function submitGuess() {
  const guess = currentGuess;

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
      updateKeyboardKey(guess[i], "correct");
    } else if (answer.includes(guess[i])) {
      box.classList.add("present");
      updateKeyboardKey(guess[i], "present");
    } else {
      box.classList.add("absent");
      updateKeyboardKey(guess[i], "absent");
    }
  }

  currentGuessCount++;
  document.getElementById("guessCount").textContent = `Guesses: ${currentGuessCount} / ${maxGuesses}`;

  if (guess === answer) {
    showMessage("You got it! ð");
    disableInput();
  } else if (currentGuessCount === maxGuesses) {
    showMessage(`Out of tries! The word was: ${answer}`);
    disableInput();
  }

  currentGuess = "";
}

function updateBoardDisplay() {
  const row = board.children[currentGuessCount];
  for (let i = 0; i < wordLength; i++) {
    const box = row.children[i];
    box.textContent = currentGuess[i] || "";
  }
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}

function disableInput() {
  const keys = document.querySelectorAll(".keyboard-key");
  keys.forEach(key => key.disabled = true);
}

function updateKeyboardKey(letter, status) {
  const keyButton = document.querySelector(`.keyboard-key[data-key="${letter.toUpperCase()}"]`);
  if (!keyButton) return;

  const currentStatus = keyButton.dataset.status;
  const statusPriority = { absent: 0, present: 1, correct: 2 };

  if (!currentStatus || statusPriority[status] > statusPriority[currentStatus]) {
    keyButton.classList.remove("absent", "present", "correct");
    keyButton.classList.add(status);
    keyButton.dataset.status = status;
  }
}

function handleKeyClick(key) {
  if (currentGuessCount >= maxGuesses) return;

  if (key === "Enter") {
    if (currentGuess.length === wordLength) {
      submitGuess();
    }
  } else if (key === "Del") {
    currentGuess = currentGuess.slice(0, -1);
  } else {
    if (currentGuess.length < wordLength) {
      currentGuess += key.toLowerCase();
    }
  }

  updateBoardDisplay();
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
      button.setAttribute("data-key", key);
      button.onclick = () => handleKeyClick(key);
      rowDiv.appendChild(button);
    });

    keyboard.appendChild(rowDiv);
  });
}

window.onload = () => {
  createKeyboard();
  };
