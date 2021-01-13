let robot = require("robotjs");

// ¿ TENDRAS EL JUEGO ABIERTO O MINIMIZADO HACIENDO OTRA COSA ?
const GAME_OPEN = false;

///////////////////// TIEMPOS //////////////////////////////////////////

// PARA GAME_OPEN = False
// TIEMPO CERRAR VENTANA DESPUES DE OPERACIÓN
const CLOSE_WINDOW_SECS = 5;

// PARA GAME_OPEN = False
// RANGO TIEMPO DE EJECUTAR OPERACIÓN UNA VEZ ABIERTA VENTANA (EN SEGUNDOS)
const MIN_SECS_EXECUTE_OP = 1;
const MAX_SECS_EXECUTE_OP = 2.5;

// SEGUNDOS ENTRE CLICKS AL COMER (EN SEGUNDOS)
const MAX_SECS_BETWEEN_CLICK = 0.25;
const MIN_SECS_BETWEEN_CLICK = 0.6;

// RANGO MINUTOS APRETAR KEY
//TECLA A APRETAR
const KEY = "f11";
const MAX_MINS_KEYPRESS = 7; // RECOMEDADO 8
const MIN_MINS_KEYPRESS = 5.8; // RECOMEDADO 6

// RANGO DE MINUTOS PARA COMER
const MAX_MINS_FOOD = 14; // RECOMEDADO 14
const MIN_MINS_FOOD = 9; // RECOMENDADO 9

// RANGO DE CLICKS PARA COMER (CANTIDADES DE CLICKS)
const MAX_AMOUNT_CLICKS = 5; // RECOMENDADO 5
const MIN_AMOUNT_CLICKS = 9; // RECOMENDADO 9

/////////////////////////////////////////////////////////

///////////////////////// POSICIONES PANTALLA ////////////////////////

/////////////////////////////////////////////////////////
const SCREEN_SIZE = robot.getScreenSize();

// coordenadas Icono Tibia abajo
const TAB_WIDTH = SCREEN_SIZE.width / 2 - 290;
const TAB_HEIGHT = SCREEN_SIZE.height - 20;

// coordenadas minimzar ventana
const CLOSE_WIDTH = SCREEN_SIZE.width - 120;
const CLOSE_HEIGHT = 10;

// COORDENADAS ORIGIN DE COMIDA
// const FOOD_WIDTH = SCREEN_SIZE.width / 2 + 690;
// const FOOD_HEIGHT = SCREEN_SIZE.height / 2 - 150;

//POSICION COMIDA PARA CREAR CLICK EN ESPACIO RANDOM DEL CUADRANTE
// ARRIBA IZQUIERDA
const X1_FOOD = SCREEN_SIZE.width / 2 + 675;
const Y1_FOOD = SCREEN_SIZE.height / 2 - 162;

// ABAJO DERECHA
const X2_FOOD = SCREEN_SIZE.width / 2 + 706;
const Y2_FOOD = SCREEN_SIZE.height / 2 - 135;

/// --------------- NO CAMBIAR DE ACA HACIA ABAJO -------------------------------////

//////////////// MINUTOS Y SEGUNDOS A MILISEGUNDOS  ///////////////
// Tiempo Clicks entre comida
const MILI_MAX_SECS_BETWEEN_CLICK = secondsToMiliSeconds(
  MAX_SECS_BETWEEN_CLICK
);
const MILI_MIN_SECS_BETWEEN_CLICK = secondsToMiliSeconds(
  MIN_SECS_BETWEEN_CLICK
);

// Tiempo entre keypress
const MILI_MAX_MINUTES_KEYPRESS = minutesToMiliSeconds(MAX_MINS_KEYPRESS);
const MILI_MIN_MINUTES_KEYPRESS = minutesToMiliSeconds(MIN_MINS_KEYPRESS);

// Tiempo entre comidas
const MILI_MAX_MINS_FOOD = minutesToMiliSeconds(MAX_MINS_FOOD);
const MILI_MIN_MINS_FOOD = minutesToMiliSeconds(MIN_MINS_FOOD);

// Abrir ventana
const MILI_CLOSE_WINDOW_SECS = secondsToMiliSeconds(CLOSE_WINDOW_SECS);

// Ejecutar operacion despues de

const MILI_MAX_SECS_EXECUTE_OP = secondsToMiliSeconds(MAX_SECS_EXECUTE_OP);
const MILI_MIN_SECS_EXECUTE_OP = secondsToMiliSeconds(MIN_SECS_EXECUTE_OP);

/////////////////// FUNCIONES /////////////////////////////

// TRANSFORMADORES DE TIEMPO
////////////////////////////////////////
const formatDisplayTime = (time) => {
  let mins = Math.floor(time / 60);
  let secs = time % 60;
  return (
    (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs)
  );
};

function secondsToMiliSeconds(seconds) {
  return seconds * 1000;
}

function minutesToMiliSeconds(minutes) {
  return minutes * 60 * 1000;
}
//////////////////////////////////////////////////

// CLICKS COMIDA
const randomClicks = (maxClicks, minClicks, maxTimeClick, minTimeClick) => {
  const X =
    X1_FOOD +
    (X2_FOOD - X1_FOOD) / 2 +
    Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1);
  const Y =
    Y2_FOOD -
    (Y2_FOOD - Y1_FOOD) / 2 +
    Math.ceil(Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1);

  robot.moveMouseSmooth(X, Y);
  let randomAmountOfClicks = Math.floor(
    Math.random() * (maxClicks - minClicks + 1) + minClicks
  );

  while (randomAmountOfClicks > 0) {
    let randomClickDuration = Math.floor(
      Math.random() * (maxTimeClick - minTimeClick + 100) + minTimeClick
    );

    setTimeout(() => {
      console.log(randomClickDuration);
      console.log(`Come pescado a las ${new Date().toLocaleTimeString()}`);
      robot.mouseClick("right");
    }, randomClickDuration);
    randomAmountOfClicks--;
  }
};

const pressKey = (key) => {
  console.log(`Apreta ${key} a las ${new Date().toLocaleTimeString()}`);
  robot.keyTap(key);
};

////////// ABRIR Y CERRAR VENTANA
const openWindow = () => {
  if (!GAME_OPEN) {
    console.log(
      `Abre ventana de tibia a las ${new Date().toLocaleTimeString()}`
    );
    robot.moveMouse(TAB_WIDTH, TAB_HEIGHT);
    robot.mouseClick();
  }
};

const closeWindow = (segundosCierreVentan) => {
  if (!GAME_OPEN) {
    setTimeout(() => {
      robot.moveMouse(CLOSE_WIDTH, CLOSE_HEIGHT);
      console.log(`Cierra ventan a las ${new Date().toLocaleTimeString()}`);
      robot.mouseClick();
    }, segundosCierreVentan);
  }
};

////////////////// SCRIPT /////////////////////////

console.log(
  `!--- Script iniciado a las ${new Date().toLocaleTimeString()} en modalidad "GAME OPEN: ${GAME_OPEN}" ----!`
);
///// LOG
let milisegundos = 0;
setInterval(() => {
  console.log(
    `Son las ${new Date().toLocaleTimeString()} y han transcurido ${formatDisplayTime(
      milisegundos
    )} minutos`
  );
  milisegundos++;
}, 1000);
///////

// Comer
setInterval(() => {
  openWindow();
  setTimeout(() => {
    randomClicks(
      MAX_AMOUNT_CLICKS,
      MIN_AMOUNT_CLICKS,
      MILI_MAX_SECS_BETWEEN_CLICK,
      MILI_MIN_SECS_BETWEEN_CLICK
    );
  }, Math.floor(Math.random() * (MILI_MAX_SECS_EXECUTE_OP - MILI_MIN_SECS_EXECUTE_OP) + MILI_MIN_SECS_EXECUTE_OP));
  closeWindow(MILI_CLOSE_WINDOW_SECS);
}, Math.floor(Math.random() * (MILI_MAX_MINS_FOOD - MILI_MIN_MINS_FOOD + 10000) + MILI_MIN_MINS_FOOD));

// Apretar Tecla

setInterval(() => {
  openWindow();
  setTimeout(() => {
    pressKey(KEY);
  }, Math.floor(Math.random() * (MILI_MAX_SECS_EXECUTE_OP - MILI_MIN_SECS_EXECUTE_OP + 1000) + MILI_MIN_SECS_EXECUTE_OP));
  closeWindow(MILI_CLOSE_WINDOW_SECS);
}, Math.floor(Math.random() * (MILI_MAX_MINUTES_KEYPRESS - MILI_MIN_MINUTES_KEYPRESS) + MILI_MIN_MINUTES_KEYPRESS));
