const { Favorite } = require("../models");
const gemini = require("../helpers/gemini");
const key = "d3284422184741c1a98dc28a5754c4fc";
const axios = require("axios");

class FavController {
  static async add(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const { GameId } = req.params;

      const existingFavorite = await Favorite.findOne({
        where: { UserId, GameId },
      });

      const response = await axios.get(`https://api.rawg.io/api/games/${GameId}?key=${key}`);
      const gameName = response.data.name;

      if (existingFavorite) throw { name: "BadStatus" };

      const favorite = await Favorite.create({ UserId, GameId, GameName: gameName });
      res.status(201).json({
        message: "Success add to Favorite",
        favorite,
      });
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const favorite = await Favorite.findAll({
        where: {
          UserId,
        },
      });

      let gameNames = favorite.map(fav => fav.GameName);
      let data = await gemini(gameNames);

      if (!favorite) throw { name: "NotFound" };

      res.status(200).json({
        favorite,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const { GameId } = req.params;

      const favorite = await Favorite.findOne({
        where: { UserId, GameId },
      });

      if (!favorite) throw { name: "NotFound" };

      await Favorite.destroy({
        where: { UserId, GameId },
      });

      res.status(200).json({
        message: "Success remove game from favorite",
        favorite,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavController;
