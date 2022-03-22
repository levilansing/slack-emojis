const fs = require("fs");
const path = require("path");
const https = require("https");

const emojiData = require("./emojis.json");
const queue = [...emojiData.emoji];

const basePath = path.join(__dirname, "emojis/");
const inFlight = [];
const processNextInQueue = () => {
  if (inFlight.length < 20 && queue.length > 0) {
    const emoji = queue.shift();
    inFlight.push(emoji);

    const fileName =
      basePath + emoji.name + (emoji.url.match(/\.[^.]+$/) || "");
    const file = fs.createWriteStream(fileName);

    https.get(emoji.url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        if (++n % 100 === 0) {
          console.log(`${queue.length} remaining`);
        }
        inFlight.splice(inFlight.indexOf(emoji), 1);
        processNextInQueue();
      });
    });
  } else {
    if (queue.length > 0) {
      setTimeout(processNextInQueue, 100);
    } else if (inFlight.length === 0) {
      console.log("Done");
    }
  }
};

processNextInQueue();
