"use strict";

let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

//function to display the message
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//function to display the score
const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

// event listener
document.querySelector(".check").addEventListener("click", function () {
  let guess = Number(document.querySelector(".guess").value);

  // when number is 0 or less than 0 or more than 20
  if (!guess || guess < 0 || guess > 20) {
    displayMessage("Please enter the number between 1 to 20");
  }
  // when number is equal to secret number
  else if (guess === secretNumber) {
    displayMessage("Hurray!🎉 Correct Number!");

    document.querySelector(".number").textContent = guess;

    document.querySelector("body").style.backgroundColor = "#006400";
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }

  // Refactoring code: The DRY principle
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too high!" : "Too low!");
      score--;
      displayScore(score);
    } else {
      displayMessage("Game Over!😢");
      displayScore(0);
      document.querySelector("body").style.backgroundColor = "rgb(168, 0, 0)";
    }
  }

  // // when number is greater than secret number
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too high!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "Game Over!😢";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
  // // when number is less than secret number
  // else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too low!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "Game Over!😢";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
});

//Coding Challenge 1
// Implement Again button to restore all values so that user can play another game
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.floor(Math.random() * 20) + 1;

  displayMessage("Start guessing...");
  displayScore(score); // score holds 20

  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
