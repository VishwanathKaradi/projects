const display = document.querySelector(".display");
const decrease = document.querySelector(".decrease");
const reset = document.querySelector(".reset");
const increase = document.querySelector(".increase");

const displayCounter = () => (display.textContent = counter);

let counter = 0;
display.textContent = 0;

increase.addEventListener("click", function () {
  counter++;
  if (counter > 0) {
    display.classList.add("positive");
    display.classList.remove("negative", "zero"); // you can remove multiple classes, separated by comma
    // display.classList.remove("zero");
  } else if (counter === 0) {
    display.classList.add("zero");
  }
  displayCounter();
});

decrease.addEventListener("click", function () {
  // if (counter > 0) {
  //   counter--;
  // } else {
  //   counter = 0;
  // }
  counter--;
  if (counter < 0) {
    display.classList.add("negative");
    display.classList.remove("positive", "zero");
  } else if (counter === 0) {
    display.classList.add("zero");
  }
  displayCounter();
});

reset.addEventListener("click", function () {
  counter = 0;
  displayCounter();
  display.classList.add("zero");
});
