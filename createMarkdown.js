const fs = require("fs");
const path = require("path");
const emojiData = require("./emojis.json");

const fileName = (emoji) =>
  "emojis/" + emoji.name + (emoji.url.match(/\.[^.]+$/) || "");

// generate markdown table of all emojis
const table = [
  "| Emoji | Name | Emoji | Name | Emoji | Name | Emoji | Name ",
  "| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- ",
];
const emojis = emojiData.emoji;
const tableWidth = 4;
for (let i = 0; i < emojis.length; i += tableWidth) {
  table.push(
    emojis
      .slice(i, i + tableWidth)
      .map((emoji) => `| ![${emoji.name}](${fileName(emoji)}) | ${emoji.name} `)
      .join("")
  );
}

const header = "# Table of emojis\n\n";
fs.writeFileSync(path.join(__dirname, "emojis.md"), header + table.join("|\n"));
