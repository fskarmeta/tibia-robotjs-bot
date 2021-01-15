const fs = require("fs");
var robot = require("robotjs");
const SCREEN_SIZE = robot.getScreenSize();

const DEFAULT_PATH = "";
const STRINGS = ["GM"];
const accountSid = "";
const authToken = "";
const client = require("twilio")(accountSid, authToken);

const readFile = (path, strings) => {
  let stringFound = false;
  fs.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    if (data) {
      for (let str of strings) {
        if (data.includes(str)) {
          let message = data.slice(
            data.indexOf("GM"),
            data.indexOf("GM") + 213
          );
          if (
            message.includes("some message that makes it safe to keep botting")
          ) {
            console.log("entro");
            return;
          }
          console.log("paso");
          stringFound = true;
        }
      }
    }
  });
  return stringFound;
};

readFile(DEFAULT_PATH, STRINGS);
// const sendSMS = () => {
//   client.messages
//     .create({
//       body: "test",
//       from: "+12059286871",
//       to: "+56999199479",
//     })
//     .then((message) => console.log(message.sid));
// };

// sendSMS();

// console.log(readFile(DEFAULT_PATH, STRINGS));

// const CHAT_WIDTH = SCREEN_SIZE.width / 2 - 700;
// const CHAT_HEIGHT = SCREEN_SIZE.height / 2 + 210;

// const SAVE_CHAT_WIDTH = SCREEN_SIZE.width / 2 - 690;
// const SAVE_CHAT_HEIGHT = SCREEN_SIZE.height / 2 + 220;

// robot.moveMouseSmooth(CHAT_WIDTH, CHAT_HEIGHT);
// robot.mouseClick("right");
// robot.moveMouseSmooth(SAVE_CHAT_WIDTH, SAVE_CHAT_HEIGHT);
// robot.mouseClick();
