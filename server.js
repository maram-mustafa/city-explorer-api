const express = require("express");
const server = express();
// const cors = require("cors");
// const weatherData = require("./assets/weather.json");

const PORT = 3010;
//to specify Root Route
//localhost:3010/
server.get("/", (req, res) => {
  res.send("test route");
});





server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
