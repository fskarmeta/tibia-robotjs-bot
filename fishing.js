const robot = require("robotjs");

let rode;
let water;

let time = 10;
let positionsSet = false;

const Tiempos = setInterval(() => {
  console.log(time);
  if (time === 0) {
    clearInterval(Tiempos);
  }
  if (time === 10) {
    console.log("Place the mouse over the center of the fishing rode");
  }
  if (time === 5) {
    console.log("Place the mouse over the water");
  }
  time--;
}, 1000);

setTimeout(() => {
  rode = robot.getMousePos();
  console.log("Rode positon saved");
  setTimeout(() => {
    water = robot.getMousePos();
    console.log("Water position saved");
    positionsSet = true;
  }, 5000);
}, 5000);

function maxRandomPixel(num) {
  return Math.ceil(Math.random() * num) * (Math.round(Math.random()) ? 1 : -1);
}

let randomTime = Math.random() * (1800 - 880) + 880;
setInterval((randomTime) => {
  randomTime = Math.random() * (1800 - 880) + 880;

  if (positionsSet) {
    console.log(`Fishing with ${randomTime.toFixed()} miliseconds in between`);
    if (rode && water) {
      robot.moveMouseSmooth(
        rode.x + maxRandomPixel(15),
        rode.y + maxRandomPixel(20)
      );
      robot.mouseClick("right");

      robot.moveMouseSmooth(
        water.x + maxRandomPixel(17),
        water.y + maxRandomPixel(15)
      );
      robot.mouseClick();
    }
  }
}, randomTime);
