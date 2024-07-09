const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require("./bot");

app.get("/", (req, res) => {
  try {
    require("./bot");
    res.send("Minecraft Bot is running");
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
