"use strict";

//Selecting the elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//Variable declarations
let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init(); // we need to call init, as we have all variables set to ZERO inside the function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//Rolling the dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating the random number
    const dice = Math.floor(Math.random() * 6) + 1;

    console.log(dice);

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // if dice is not 1, add to current score and display
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch the player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove("player--active");

      activePlayer = activePlayer === 0 ? 1 : 0;

      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add("player--active");

      // use Toggle method to remove the player--active class if present and add if not present
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init); // NOT init() because JS will call it not us
