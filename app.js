// IMPORTACIONES - NO CAMBIAR
let robot = require("robotjs");
const fs = require("fs");
const { clear } = require("console");
const SCREEN_SIZE = robot.getScreenSize();
//
///////////////////////////////     CONFIGURACION  ////////////////////////////////////////////

// ¿ TENDRAS EL JUEGO ABIERTO O MINIMIZADO HACIENDO OTRA COSA ?
const GAME_OPEN = true;

// ¿ESTARAS AUSENTE Y QUIERES QUE TE LLEGUE UN MENSAJE SI TE HABLA UN ADMIN? (solo con game_open = true!)
const AWAY = true;

// NICKNAMES O FRASES QUE QUIERES QUE PAREN TU SCRIPT Y MANDEN MENSAJE
const STRINGS = ["GM"];

// CONFIG TU CUENTA DE TWILIO
const accountSid = "";
const authToken = "";
const client = require("twilio")(accountSid, authToken); // NO CAMBIAR

// PATH A TU ARCHIVO Default.txt en tu computador
const DEFAULT_PATH = "../Dura Client14/Default.txt";

// INFO SMS
const TEXT = "ADMIN PRESENTE TIBIA!!";
const YOUR_TWILIO_PHONE = "+12059286871";
const YOUR_CELPHONE = "+56999199479";

///////////////////////////////////  TIEMPOS //////////////////////////////////////////

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

//////////////////////////////////////// POSICIONES PANTALLA //////////////////////////////////////////////////

// COORDENADAS ICONO DE TIBIA EN BARRA DE APLICACIONES
const TAB_WIDTH = SCREEN_SIZE.width / 2 - 290;
const TAB_HEIGHT = SCREEN_SIZE.height - 20;

// COORDINADAS MINIMZAR VENTANA DE TIBIA
const CLOSE_WIDTH = SCREEN_SIZE.width - 120;
const CLOSE_HEIGHT = 10;

// COORDENADAS ORIGIN DE COMIDA
// const FOOD_WIDTH = SCREEN_SIZE.width / 2 + 690;
// const FOOD_HEIGHT = SCREEN_SIZE.height / 2 - 150;

//POSICION COMIDA PARA HACER CLICK RANDOM DENTRO DEL CUADRADO DE LA COMIDA
// ARRIBA IZQUIERDA
const X1_FOOD = SCREEN_SIZE.width / 2 + 675;
const Y1_FOOD = SCREEN_SIZE.height / 2 - 162;

// ABAJO DERECHA
const X2_FOOD = SCREEN_SIZE.width / 2 + 706;
const Y2_FOOD = SCREEN_SIZE.height / 2 - 135;

// PESTAÑA CHAT DEFAULT
const CHAT_WIDTH = SCREEN_SIZE.width / 2 - 700;
const CHAT_HEIGHT = SCREEN_SIZE.height / 2 + 210;

// PESTAÑA SAFE CHAT DEFAULT
const SAVE_CHAT_WIDTH = SCREEN_SIZE.width / 2 - 690;
const SAVE_CHAT_HEIGHT = SCREEN_SIZE.height / 2 + 220;

// MOUSE SOBRE EL CHAT DEL JUEGO PARA ESCRIBIR
const TEXT_CHAT_WIDTH = SCREEN_SIZE.width / 2 - 100;
const TEXT_CHAT_HEIGHT = SCREEN_SIZE.height / 2 + 372;

////////////////// --------------- NO CAMBIAR DE ACA HACIA ABAJO -------------------------------////////////////////////

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

/// SAY "HI" IN CHAT
const sayHi = () => {
  robot.moveMouse(TEXT_CHAT_WIDTH, TEXT_CHAT_HEIGHT);
  robot.mouseClick();
  robot.keyTap("h");
  robot.keyTap("i");
  robot.keyTap("enter");
};

////////////////// SCRIPT /////////////////////////

//FLAG
let OP_IN_EXECUTION = false;

///// LOG
console.log(
  `!--- Script iniciado a las ${new Date().toLocaleTimeString()} en modalidad "GAME OPEN: ${GAME_OPEN}" ----!`
);
let milisegundos = 0;
const LOG = setInterval(() => {
  console.log(
    `Son las ${new Date().toLocaleTimeString()} y han transcurido ${formatDisplayTime(
      milisegundos
    )} minutos`
  );
  milisegundos++;
}, 1000);

//// COMER
const EATING = setInterval(() => {
  OP_IN_EXECUTION = true;
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
  OP_IN_EXECUTION = false;
}, Math.floor(Math.random() * (MILI_MAX_MINS_FOOD - MILI_MIN_MINS_FOOD + 10000) + MILI_MIN_MINS_FOOD));

//// APRETAR TECLA
const KEYPRESS = setInterval(() => {
  OP_IN_EXECUTION = true;
  openWindow();
  setTimeout(() => {
    pressKey(KEY);
  }, Math.floor(Math.random() * (MILI_MAX_SECS_EXECUTE_OP - MILI_MIN_SECS_EXECUTE_OP + 1000) + MILI_MIN_SECS_EXECUTE_OP));
  closeWindow(MILI_CLOSE_WINDOW_SECS);
  OP_IN_EXECUTION = false;
}, Math.floor(Math.random() * (MILI_MAX_MINUTES_KEYPRESS - MILI_MIN_MINUTES_KEYPRESS) + MILI_MIN_MINUTES_KEYPRESS));

//// NOTIFICACIONE SMS SI ADMIN

if (AWAY) {
  const SMS = setInterval(() => {
    if (OP_IN_EXECUTION) {
      console.log(
        `Accion en proceso, no se leyó chat: ${new Date().toLocaleTimeString()}`
      );
      return;
    } else {
      robot.moveMouseSmooth(CHAT_WIDTH, CHAT_HEIGHT);
      robot.mouseClick("right");
      robot.moveMouseSmooth(SAVE_CHAT_WIDTH, SAVE_CHAT_HEIGHT);
      robot.mouseClick();
      console.log(`.txt guardado ${new Date().toLocaleTimeString()}`);
    }

    readFile(DEFAULT_PATH, STRINGS, SMS);
  }, 60000);
}

////// LEER ARCHIVO TXT
const readFile = (path, strings, SMS) => {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    if (data) {
      for (let str of strings) {
        if (data.includes(str)) {
          console.log(
            `ALERTA ! SE MANDA SMS ${new Date().toLocaleTimeString()}`
          );
          //MANDAR SMS
          sendSMS(TEXT, YOUR_TWILIO_PHONE, YOUR_CELPHONE);
          //PARAR TODOS LOS INTERVALOS
          clearInterval(LOG);
          clearInterval(EATING);
          clearInterval(KEYPRESS);
          clearInterval(SMS);
          // ESCRIBIR HOLA EN EL CHAT
          sayHi();
          console.log(`FIN DEL SCRIPT ${new Date().toLocaleTimeString()}`);
          break;
        }
      }
    }
  });
};

/// MANDAR SMS

const sendSMS = (text, twiliPhone, yourPhone) => {
  client.messages
    .create({
      body: text,
      from: twiliPhone,
      to: yourPhone,
    })
    .then((message) => console.log(message.sid));
};
