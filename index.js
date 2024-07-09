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

createBot(); // Call the function to initialize the bot

app.get("/", (req, res) => {
  try {
    const bot = mineflayer.createBot({
      host: "51mple.aternos.me",
      port: 43008,
      username: "Bot",
    });

    bot.on("login", () => {
      res.send("Bot has logged in");
      bot.chat("Hello, world!");
    });

    bot.on("chat", (username, message) => {
      if (username === bot.username) return;
      bot.chat(`You said: ${message}`);
    });

    bot.on("error", (err) => console.log(err));
    bot.on("end", () => {
      console.log("Bot has disconnected");
      // If you want to send a response when the bot disconnects, you need to handle it properly
      // res.send("Bot has disconnected"); // This can cause an error since res.send was already called on login
      setTimeout(() => {
        createBot();
      }, 5000);
    });

    console.log("Bot created for / route");
  } catch (error) {
    res.send(error.toString());
  }
});

app.get("/test", (req, res) => {
  res.send("test");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
