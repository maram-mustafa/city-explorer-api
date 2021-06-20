const axios = require("axios");

class MovieData {
  constructor(item) {
    (this.title = item.title),
      (this.img = `https://image.tmdb.org/t/p/w500${item.poster_path}`);
  }
}

let movieMemory = {};

function moviesFunc(req, res) {
  let cityName = req.query.searchQuery;
  const key = process.env.MOVIE_KEY;

  if (movieMemory[cityName] !== undefined) {
    res.send(movieMemory[cityName]);
    console.log("get data from memory");
  } else {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`;
    console.log("get data from API");
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        let result = response.data.results.map((item) => {
          return new MovieData(item);
        });
        movieMemory[cityName] = result;
        res.send(result);
      })

      .catch((error) => {
        res.status(500).send("movies not found in this city");
      });
  }
}

module.exports = moviesFunc;
