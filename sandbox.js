var robot = require("robotjs");
let SCREEN_SIZE = robot.getScreenSize();

// ARRIBA IZQUIERDA
const X1_FOOD = SCREEN_SIZE.width / 2 + 675;
const Y1_FOOD = SCREEN_SIZE.height / 2 - 162;

// ABAJO DERECHA
const X2_FOOD = SCREEN_SIZE.width / 2 + 706;
const Y2_FOOD = SCREEN_SIZE.height / 2 - 135;

const X =
  X1_FOOD +
  (X2_FOOD - X1_FOOD) / 2 +
  Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1);
const Y =
  Y2_FOOD -
  (Y2_FOOD - Y1_FOOD) / 2 +
  Math.ceil(Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1);

robot.moveMouse(X, Y);

console.log(X, Y);
