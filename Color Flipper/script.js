const button = document.querySelector(".btnClick");
const colors = ["Red", "Green", "Yellow", "Blue"];

button.addEventListener("click", function () {
  document.body.style.backgroundColor =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
});

// random hex color
// const hexColor = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
// const hex = "#";

// for (let i = 0; i < 6; i++) {
//   hex += hexColor[Math.floor(Math.random() * hexColor.length)];
// }
// document.body.style.backgroundColor = hex;
////////////////////
//
// only 1 line code
// document.body.style.backgroundColor =
//   "#" + Math.floor(Math.random() * 16777215).toString(16);
/////////////////////////////////
// random 4 colors only
// i = Math.floor(Math.random() * 4 + 1);
// document.body.style.backgroundColor = colors[i];
/////////////////////////////////
// display 4 random colors in order with delay
// for (let j = 0; j <= colors.length; j++) {
//   task(j);
// }
// function task(j) {
//   setTimeout(function () {
//     document.body.style.backgroundColor = colors[j];
//   }, 2000 * j);
// }
//////////////////////////////////
