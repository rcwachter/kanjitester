let kanjiList = [];
let currentKanji = "";
let currentIndex = 0;
let score = 0;
let selectedLevel = "";

fetch("kanji.json")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("startButton").addEventListener("click", startQuiz);
    document
      .getElementById("submitAnswerButton")
      .addEventListener("click", submitAnswer);
    document
      .getElementById("answerInput")
      .addEventListener("input", convertToHiragana);
  });

function selectLevel(level) {
  selectedLevel = `level${level}`;
  document.getElementById("startButton").classList.remove("hidden");
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  filterKanjiList();
  document.getElementById("quizContainer").classList.remove("hidden");
  document.getElementById("startButton").classList.add("hidden");
  displayNextKanji();
}

function filterKanjiList() {
  fetch("kanji.json")
    .then((response) => response.json())
    .then((data) => {
      kanjiList = data[selectedLevel];
    });
}

function submitAnswer() {
  const userAnswer = document.getElementById("answerInput").value;
  const correctAnswer = kanjiList[currentIndex - 1].onyomi;
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
  if (currentIndex < kanjiList.length) {
    currentKanji = kanjiList[currentIndex].kanji;
    document.getElementById("kanjiDisplay").innerText = currentKanji;
    document.getElementById("answerInput").value = "";
    document.getElementById("feedback").innerText = "";
    currentIndex++;
  } else {
    document.getElementById(
      "feedback"
    ).innerText = `Quiz Complete! Your score is ${score}/${kanjiList.length}.`;
    document.getElementById("quizContainer").classList.add("hidden");
    document.getElementById("startButton").classList.remove("hidden");
  }
}

function convertToHiragana(event) {
  const inputElement = event.target;
  const hiragana = wanakana.toHiragana(inputElement.value);
  inputElement.value = hiragana;
}
