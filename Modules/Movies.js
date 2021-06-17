const axios = require("axios");

class MovieData {
  constructor(item) {
    (this.title = item.title),
      (this.img = `https://image.tmdb.org/t/p/w500${item.poster_path}`);
  }
}


function moviesFunc(req, res) {
  //https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${cityName}

  const key = process.env.MOVIE_KEY;
  let cityName = req.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`;
  
  axios.get(url).then((response) => {
    console.log(response);
    let result = response.data.results.map((item) => {
      return new MovieData(item);
    });
    res.send(result);
  });
}

module.exports = moviesFunc;
