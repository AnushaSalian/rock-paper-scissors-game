"use strict";

const startBtn = document.querySelector(".start-btn");
const info1 = document.querySelector(".info-1");
const info2 = document.querySelector(".info-2");
const playerName = document.querySelector(".player-name");
const gameDiv = document.querySelector(".game-div");
const formDiv = document.querySelector(".form-div");
const gamePlayerName = document.querySelector(".player-name2");
const rockBtn = document.querySelector(".rock-btn");
const paperBtn = document.querySelector(".paper-btn");
const scissorsBtn = document.querySelector(".scissors-btn");
const choiceImgPlayer = document.querySelector(".choice-img2");
const choiceImgComputer = document.querySelector(".choice-img1");
const computerScore = document.querySelector(".game-score1");
const playerScore = document.querySelector(".game-score2");
const playersResult = document.querySelector(".players-result");
const playAgainDiv = document.querySelector(".play-again-div");
const playAgainBtn = document.querySelector(".play-again");
const gameBtnDiv = document.querySelector(".game-buttons-div");

let fullName;

const validatePlayerName = function (secondPlayerName) {
  fullName =
    !secondPlayerName || secondPlayerName === "" || secondPlayerName === " "
      ? "Player"
      : secondPlayerName;
  return fullName;
};

startBtn.addEventListener("click", function (e) {
  e.preventDefault();

  info1.innerHTML = `Select either rock <img class="rock-sent" src='images/stone.png'/>, paper <img class="rock-sent" src='images/paper2.png'/>, or scissors <img class="rock-sent scis-sent" src='images/scissors2.png'/> and see if you can beat the computer!`;
  info2.innerHTML = `<strong>NOTE:</strong> "Rock breaks scissors, scissors cuts paper, paper covers rock."`;

  gamePlayerName.textContent = validatePlayerName(playerName.value);

  playersResult.innerHTML = `Who wins? Computer vs. ${validatePlayerName(
    playerName.value
  )}`;

  gameDiv.classList.remove("hide");
  gameBtnDiv.classList.remove("hide");
  formDiv.classList.add("hide");
});

let displayed = false,
  image1,
  image2;

const displayImage1 = function (img, classNum) {
  displayed = true;
  image1 = document.createElement("img");
  image1.classList.add("choice-img");
  image1.src = "images/" + img + "2.png";
  document.querySelector(".choice-img" + classNum).append(image1);
};

const displayImage2 = function (img, classNum) {
  displayed = true;
  image2 = document.createElement("img");
  image2.classList.add("choice-img");
  image2.src = "images/" + img + "2.png";
  document.querySelector(".choice-img" + classNum).append(image2);
};

const clearImage = function () {
  if (displayed) {
    image1.remove();
    image2.remove();
  }
};

const buttons = ["rock", "paper", "scissors"];
let computerChoice;
const score = 10;
let playerChoice;
const generateRandomImage = function () {
  const rand = Math.floor(Math.random() * 3);
  computerChoice = buttons[rand];

  clearImage();
  displayed = true;
  displayImage2(buttons[rand], "1");
};

let score1 = 0,
  score2 = 0;
const generateResult = function (computerChoice, playerChoice) {
  let result;

  if (computerChoice === "rock" && playerChoice === "paper") {
    score2 += score;
    playerScore.innerHTML = score2;
    result = `${fullName} wins  🥳`;
  }

  if (computerChoice === "rock" && playerChoice === "scissors") {
    score1 += score;
    computerScore.innerHTML = score1;
    result = `Computer wins  🥳`;
  }

  if (computerChoice === "rock" && playerChoice === "rock") {
    result = "Tie";
  }

  if (computerChoice === "paper" && playerChoice === "rock") {
    score1 += score;
    computerScore.innerHTML = score1;
    result = `Computer wins  🥳`;
  }

  if (computerChoice === "paper" && playerChoice === "scissors") {
    score2 += score;
    playerScore.innerHTML = score2;
    result = `${fullName} wins  🥳`;
  }

  if (computerChoice === "paper" && playerChoice === "paper") {
    result = "Tie";
  }

  if (computerChoice === "scissors" && playerChoice === "rock") {
    score2 += score;
    playerScore.innerHTML = score2;
    result = `${fullName} wins  🥳`;
  }
  if (computerChoice === "scissors" && playerChoice === "paper") {
    score1 += score;
    computerScore.innerHTML = score1;
    result = `Computer wins 🥳`;
  }
  if (computerChoice === "scissors" && playerChoice === "scissors") {
    result = "Tie";
  }

  return result;
};

const checkScoreIs100 = function () {
  if (score1 === 100) {
    playersResult.innerHTML = `Computer won 🏆👏🏻`;
    document.querySelector(".player1").classList.add("win");
    playersResult.classList.add("highlight-winner");
  }
  if (score2 === 100) {
    playersResult.innerHTML = `${fullName} won 🏆👏🏻`;
    document.querySelector(".player2").classList.add("win");
    playersResult.classList.add("highlight-winner");
  }
  if (score1 >= 100 || score2 >= 100) {
    clearImage();
    gameBtnDiv.classList.add("hide");
    playAgainDiv.classList.remove("hide");
    // playAgainDiv.classList.add("highlight-winner");
  }
};

rockBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearImage();
  generateRandomImage();
  playerChoice = "rock";
  displayImage1("rock", "2");
  playersResult.innerHTML = generateResult(computerChoice, playerChoice);
  checkScoreIs100();
});

paperBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearImage();
  generateRandomImage();
  playerChoice = "paper";
  displayImage1("paper", "2");
  playersResult.innerHTML = generateResult(computerChoice, playerChoice);
  checkScoreIs100();
});

scissorsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearImage();
  generateRandomImage();
  playerChoice = "scissors";
  displayImage1("scissors", "2");
  playersResult.innerHTML = generateResult(computerChoice, playerChoice);
  checkScoreIs100();
});

playAgainBtn.addEventListener("click", function (e) {
  e.preventDefault();

  gameDiv.classList.add("hide");
  playAgainDiv.classList.add("hide");
  formDiv.classList.remove("hide");
  playersResult.classList.remove("highlight-winner");
  // playAgainDiv.classList.remove("highlight-play-again");
  document.querySelector(".player1").classList.remove("win");
  document.querySelector(".player2").classList.remove("win");

  playerName.value = "";
  score1 = score2 = 0;
  playerChoice = "";
  computerChoice = "";

  computerScore.innerHTML = "0";
  playerScore.innerHTML = "0";

  info1.innerHTML = `Type your name in the input box.`;
  info2.innerHTML = `Then click on "START" to play.`;
});
