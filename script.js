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
