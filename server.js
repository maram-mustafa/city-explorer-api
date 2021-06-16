require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherData = require("./assets/weather.json");

const moviesFunc = require("./Modules/Movies");
const weatherOne = require("./Modules/Weather");
const weatherTwo = require("./Modules/Weather");

const server = express();

server.use(cors());

const PORT = process.env.PORT;

//to specify Root Route
//localhost:3010/
server.get("/", (req, res) => {
  res.send("test route");
});

//localhost:3010/weatherAll
server.get("/weatherAll", (req, res) => {
  res.send(weatherData);
});

server.get("/weather", weatherOne);

server.get("/weather2", weatherTwo);

server.get("/movies", moviesFunc);

server.get("*", (req, res) => {
  res.status(404).send("sorry, this page not found");
});

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
