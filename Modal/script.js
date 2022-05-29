"use strict";

//////// It picks up only 1st Modal as we've used querySelector, to pick all 3 use querySelectorAll

// const openModal = document.querySelector(".show-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

////////// Hidden class is removed only when we click on 1st Modal
// btnsOpenModal.addEventListener("click", function () {
//   modal.classList.remove("hidden");
// });

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal); // we do not write openModal(), because with braces it will call as soon as it loads but we want it when we click button btnsOpenModal
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//Keyboard events
//Keydown, Keypress and Keyup are keyboard events, usually keydown is most used.
//Whenever any key is pressed keydown event is generated and as a result JS will generate an object which will contain all the info about the event itself.
// And that object can be accessed in the event handler

document.addEventListener("keydown", function (e) {
  // console.log("Certain Key is pressed");
  // console.log(e); // e is the object which contains info about the event
  // console.log(`Pressed key is ${e.key}`);

  // we need to close modal window when ESCAPE key is pressed and when modal window is opened

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// for random background color generator
// document.querySelector(".color").addEventListener("click", function () {
//   console.log("hello");
//   document.querySelector("body").style.backgroundColor =
//     "#" + Math.floor(Math.random() * 16777215).toString(16);
// });
