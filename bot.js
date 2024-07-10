const mineflayer = require("mineflayer");

function createBot() {
  const bot = mineflayer.createBot({
    host: "abhinavsachu.aternos.me",
    port: 18438,
    username: "Bot",
    version: "1.20.4",
  });

  bot.on("login", () => {
    console.log("Bot has logged in");
    bot.chat("Hello, world!");

    // Clear all control states initially
    bot.setControlState("forward", false);
    bot.setControlState("back", false);
    bot.setControlState("left", false);
    bot.setControlState("right", false);
    bot.setControlState("jump", false);
    bot.setControlState("sneak", false);

    // Function to perform random movements
    function randomMove() {
      const turn = getRandomInt(1, 6);
      switch (turn) {
        case 1:
          bot.setControlState("forward", true);
          console.log("Moving forward");
          break;
        case 2:
          bot.setControlState("back", true);
          console.log("Moving back");
          break;
        case 3:
          bot.setControlState("left", true);
          console.log("Moving left");
          break;
        case 4:
          bot.setControlState("right", true);
          console.log("Moving right");
          break;
        case 5:
          bot.setControlState("jump", true);
          console.log("Jumping");
          break;
        case 6:
          bot.setControlState("sneak", true);
          console.log("Sneaking");
          break;
        default:
          console.log("Unknown direction");
      }

      // Reset all control states after 1 second
      setTimeout(() => {
        bot.setControlState("forward", false);
        bot.setControlState("back", false);
        bot.setControlState("left", false);
        bot.setControlState("right", false);
        bot.setControlState("jump", false);
        bot.setControlState("sneak", false);
      }, 1000);
    }

    // Generate random movements every 5 seconds
    setInterval(randomMove, 5000);
  });

  bot.on("chat", (username, message) => {
    if (username === bot.username) return;
    bot.chat(`You said: ${message}`);

    // Clear all control states before handling chat commands
    bot.setControlState("forward", false);
    bot.setControlState("back", false);
    bot.setControlState("left", false);
    bot.setControlState("right", false);
    bot.setControlState("jump", false);
    bot.setControlState("sneak", false);

    // Handle chat commands for movement
    switch (message) {
      case "f":
        bot.setControlState("forward", true);
        console.log("Moving forward");
        break;
      case "b":
        bot.setControlState("back", true);
        console.log("Moving back");
        break;
      case "l":
        bot.setControlState("left", true);
        console.log("Moving left");
        break;
      case "rt":
        bot.setControlState("right", true);
        console.log("Moving right");
        break;
      case "j":
        bot.setControlState("jump", true);
        console.log("Jumping");
        break;
      case "s":
        bot.setControlState("sneak", true);
        console.log("Sneaking");
        break;
      default:
        console.log("Unknown direction");
    }

    // Reset all control states after 1 second
    setTimeout(() => {
      bot.setControlState("forward", false);
      bot.setControlState("back", false);
      bot.setControlState("left", false);
      bot.setControlState("right", false);
      bot.setControlState("jump", false);
      bot.setControlState("sneak", false);
    }, 1000);
  });

  bot.on("error", (err) => console.log(err));
  bot.on("end", () => {
    console.log("Bot has disconnected");
    setTimeout(createBot, 5000);
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

createBot();
