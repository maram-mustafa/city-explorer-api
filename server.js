const express = require("express");
const server = express();
const weatherData = require("./assets/weather.json");

// const cors = require("cors");

const PORT = 3010;
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
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  let result = "";
  if (
    lat == weatherData.lat &&
    lon == weatherData.lon &&
    searchQuery == weatherData.city_name
  ) {
    result = weatherData.data;
  } else {
    result = "error";
  }

  res.send(result);
});

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
