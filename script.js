const maxGuesses = 6;
let currentGuessCount = 0;
const answer = "plush"; // Replace with your dynamic word later
const wordLength = answer.length;
document.documentElement.style.setProperty("--letters", wordLength);
function getDayIndex(startDateStr = '2025-01-01') {
  const startDate = new Date(startDateStr);
  const today = new Date();
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
}

function getDailyWordDynamic(wordLists) {
  const index = getDayIndex();
  const lengths = Object.keys(wordLists).sort(); // ['4', '5', '6']
  const lengthChoice = lengths[index % lengths.length];
  const wordList = wordLists[lengthChoice];
  const word = wordList[index % wordList.length];
  return { word, length: parseInt(lengthChoice) };
}

const { word: answer, length: wordLength } = getDailyWordDynamic(wordLists);
const board = document.getElementById('board');
const result = document.getElementById('result');
const guessInput = document.getElementById('guessInput');

guessInput.maxLength = wordLength;
guessInput.placeholder = `Enter ${wordLength}-letter word`;

function submitGuess() {
  const guess = guessInput.value.toLowerCase();
  if (guess.length !== wordLength) {
    result.textContent = `Word must be ${wordLength} letters!`;
    return;
  }

  board.innerHTML = '';

  for (let i = 0; i < wordLength; i++) {
    const char = guess[i];
    let status = 'gray';
    if (char === answer[i]) {
      status = 'green';
    } else if (answer.includes(char)) {
      status = 'yellow';
    }

    const div = document.createElement('div');
    div.className = `letter ${status}`;
    div.textContent = char.toUpperCase();
    board.appendChild(div);
  }

  if (guess === answer) {
    result.textContent = "🎉 You got it!";
  } else {
    result.textContent = "";
  }
}
const board = document.getElementById("game-board");

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

document.getElementById("submitButton").addEventListener("click", submitGuess);

function submitGuess() {
  const guess = document.getElementById("guessInput").value.toLowerCase();
  if (guess.length !== wordLength) return showMessage("Guess must be " + wordLength + " letters.");
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

  document.getElementById("guessInput").value = "";
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}

function disableInput() {
  document.getElementById("guessInput").disabled = true;
  document.getElementById("submitButton").disabled = true;
}
