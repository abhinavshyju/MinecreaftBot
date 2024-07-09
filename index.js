const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const mineflayer = require("mineflayer");

function createBot() {
  const bot = mineflayer.createBot({
    host: "51mple.aternos.me",
    port: 43008,
    username: "Bot",
  });

  bot.on("login", () => {
    console.log("Bot has logged in");
    bot.chat("Hello, world!");
  });

  bot.on("chat", (username, message) => {
    if (username === bot.username) return;
    bot.chat(`You said: ${message}`);
  });

  bot.on("error", (err) => console.log(err));
  bot.on("end", () => {
    console.log("Bot has disconnected");
    setTimeout(createBot, 5000);
  });
}

app.get("/", (req, res) => {
  try {
    createBot();
    res.send("Minecraft Bot is running");
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
