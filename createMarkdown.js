const fs = require("fs");
const path = require("path");
const emojiData = require("./emojis.json");

const imageTag = (emoji) => {
  const path = "emojis/" + emoji.name + (emoji.url.match(/\.[^.]+$/) || "");
  return `<img src="${path}" max-width="100px">`;
};

const cleanName = (emoji) => {
  const name = emoji.name.replace(/[_\-]/g, "-");
  return name.split("").reduce(
    ([out, n], char, i) => {
      if (!char.match(/[\s\-]/)) {
        if (n >= 16 && i !== name.length - 1) {
          out += "-";
          n = 0;
        } else {
          n++;
        }
      } else {
        n = 0;
      }
      out += char;
      return [out, n];
    },
    ["", 0]
  )[0];
};

// generate markdown table of all emojis
const tableWidth = 4;
const table = [
  "| Name | Emoji ".repeat(tableWidth),
  "| ---: | :---: ".repeat(tableWidth),
];
const emojis = emojiData.emoji;
for (let i = 0; i < emojis.length; i += tableWidth) {
  table.push(
    emojis
      .slice(i, i + tableWidth)
      .map((emoji) => `| ${cleanName(emoji)} | ${imageTag(emoji)} `)
      .join("")
  );
}

const header = "# Table of emojis\n\n";
fs.writeFileSync(path.join(__dirname, "emojis.md"), header + table.join("|\n"));
