const axios = require("axios");
const weatherData = require("../assets/weather.json");

class Data {
  constructor(item) {
    (this.datetime = item.datetime),
      (this.description = item.weather.description);
  }
}

function weatherOne(req, res) {
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
}

function weatherTwo(req, res) {
  const key = process.env.WEATHER_KEY;
  let searchQuery = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${key}`;

  axios.get(url).then((response) => {
    console.log(response.data);

    let result = response.data.data.map((item) => {
      return new Data(item);
    });
    res.send(result);
  });
}

module.exports = weatherOne;
module.exports = weatherTwo;
