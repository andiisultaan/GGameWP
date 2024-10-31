const axios = require("axios");
const key = "d3284422184741c1a98dc28a5754c4fc";
const geminiFunFact = require("../helpers/geminiFunFact");

class gameController {
  static async games(req, res, next) {
    try {
      const { page = 1, search = "" } = req.query;
      const response = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=${page}&search=${search}`);

      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  static async gamesDetail(req, res, next) {
    try {
      const { id } = req.params;
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`);
      let gameName = response.data.name;
      let data = await geminiFunFact(gameName);

      // console.log(data);

      res.status(200).json({
        gameDetails: response.data,
        funFact: data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = gameController;
