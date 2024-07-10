const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const mineflayer = require("mineflayer");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/command", (req, res) => {
  console.log(req.body);
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Form submitted");
});
app.get("/test", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
