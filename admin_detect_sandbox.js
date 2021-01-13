const fs = require("fs");
var robot = require("robotjs");
const SCREEN_SIZE = robot.getScreenSize();

const admins = [
  "GM Someone",
  "GM Someone",
  "GM Someone",
  "GM Someone",
  "GM Someone",
];
const accountSid = "";
const authToken = "";
const client = require("twilio")(accountSid, authToken);

const readFile = () => {
  fs.readFile("../tibiaClient/Default.txt", "utf8", function (err, data) {
    if (err) throw err;
    if (data) {
      // for (const admin of admins) {
      if (data.includes("Bafian")) {
        console.log("yes");
        sendSMS();
      } else {
        console.log("no");
      }
    }
    //   }
  });
};

const sendSMS = () => {
  client.messages
    .create({
      body: "ADMIN PRESENTE TIBIA!!",
      from: "+12059286871",
      to: "+56999199479",
    })
    .then((message) => console.log(message.sid));
};

const CHAT_WIDTH = SCREEN_SIZE.width / 2 - 700;
const CHAT_HEIGHT = SCREEN_SIZE.height / 2 + 210;

const SAVE_CHAT_WIDTH = SCREEN_SIZE.width / 2 - 690;
const SAVE_CHAT_HEIGHT = SCREEN_SIZE.height / 2 + 220;

robot.moveMouse(CHAT_WIDTH, CHAT_HEIGHT);
robot.mouseClick("right");
robot.moveMouse(SAVE_CHAT_WIDTH, SAVE_CHAT_HEIGHT);
robot.mouseClick();
