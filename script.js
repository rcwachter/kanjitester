let kanjiList = [];
let currentKanji = "";
let usedKanjiIndexes = [];
let score = 0;
let selectedLevel = "";

fetch("kanji.json")
  .then((response) => response.json())
  .then((data) => {
    document
      .getElementById("submitAnswerButton")
      .addEventListener("click", submitAnswer);
    document
      .getElementById("answerInput")
      .addEventListener("input", convertToHiragana);
    document
      .getElementById("answerInput")
      .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          submitAnswer();
        }
      });
  });

function selectLevel(level) {
  selectedLevel = `level${level}`;
  startQuiz();
}

function startQuiz() {
  usedKanjiIndexes = [];
  score = 0;
  filterKanjiList().then(() => {
    document.getElementById("quizContainer").classList.remove("hidden");
    displayNextKanji();
  });
}

function filterKanjiList() {
  return fetch("kanji.json")
    .then((response) => response.json())
    .then((data) => {
      kanjiList = data[selectedLevel];
    });
}

function submitAnswer() {
  const userAnswer = document.getElementById("answerInput").value;
  const correctAnswer =
    kanjiList[usedKanjiIndexes[usedKanjiIndexes.length - 1]].onyomi;
  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").innerText = "Correct!";
    score++;
    setTimeout(() => {
      displayNextKanji();
    }, 1000);
  } else {
    document.getElementById("feedback").innerText = "Try again!";
  }
}

function displayNextKanji() {
  if (usedKanjiIndexes.length < kanjiList.length) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * kanjiList.length);
    } while (usedKanjiIndexes.includes(randomIndex));

    usedKanjiIndexes.push(randomIndex);
    currentKanji = kanjiList[randomIndex].kanji;
    document.getElementById("kanjiDisplay").innerText = currentKanji;
    document.getElementById("answerInput").value = "";
    document.getElementById("feedback").innerText = "";
  } else {
    document.getElementById(
      "feedback"
    ).innerText = `Quiz Complete! Your score is ${score}/${kanjiList.length}.`;
    document.getElementById("quizContainer").classList.add("hidden");
  }
}

function convertToHiragana(event) {
  const inputElement = event.target;
  const hiragana = wanakana.toHiragana(inputElement.value);
  inputElement.value = hiragana;
}
