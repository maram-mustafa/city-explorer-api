require("dotenv").config();
const express = require("express");
const weatherData = require("./assets/weather.json");
const cors = require("cors");
const axios = require("axios");
const { response } = require("express");
const server = express();

server.use(cors());

const PORT = process.env.PORT;

class Data {
  constructor(item) {
    (this.datetime = item.datetime),
      (this.description = item.weather.description);
  }
}

//to specify Root Route
//localhost:3010/
server.get("/", (req, res) => {
  res.send("test route");
});

//localhost:3010/weatherAll
server.get("/weatherAll", (req, res) => {
  res.send(weatherData);
});

server.get("/weather2", (req, res) => {
  const key = process.env.WEATHER_KEY;
  let searchQuery = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${key}`;

  // class Data {
  //   constructor(item) {
  //     (this.datetime = item.datetime),
  //       (this.description = item.weather.description);
  //   }
  // }

  
  axios.get(url).then((response) => {
    console.log(response.data);

    let result = response.data.data.map((item) => {
      return new Data(item);
    });
    res.send(result);
  });
});

//localhost:3010/weather?lat=..&lon=..&searchQuery=...
server.get("/weather", (req, res) => {
  // let lat = req.query.lat;
  // let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  let result = weatherData
    .find((item) => {
      if (searchQuery == item.city_name) {
        return item;
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
