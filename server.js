require("dotenv").config();
const express = require("express");
const weatherData = require("./assets/weather.json");
const cors = require("cors");
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

//localhost:3010/weather?lat=..&lon=..&searchQuery=...
server.get("/weather", (req, res) => {
  // let lat = req.query.lat;
  // let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  class Data {
    constructor(item) {
      (this.snow = item.snow),
        (this.description = item.weather.description);
    }
  }

  let result = weatherData
    .find((item) => {
      if (searchQuery == item.city_name) {
        return item;``
      }
    })
    .data.map((item) => {
      return new Data(item);
    });
  res.send(result);
});

server.get("*", (req, res) => {
  res.status(404).send("sorry, this page not found");
});

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
