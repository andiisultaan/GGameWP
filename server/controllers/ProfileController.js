const { User, Favorite } = require("../models");
const cloudinary = require("../utils/cloudinary");

class profileController {
  static async profile(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const user = await User.findOne({
        where: {
          id: UserId,
        },
        include: [
          {
            model: Favorite,
            attributes: ["UserId", "GameId"],
          },
        ],
      });

      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        Favorite: user.Favorites,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      let user = await User.findByPk(UserId);

      if (!user) throw { name: "NotFound" };

      const imageBuffer = req.file.buffer.toString("base64");

      const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${imageBuffer}`, {
        folder: "profile_pictures",
        public_id: `profile_${UserId}`,
      });

      await User.update({ profilePicture: result.secure_url }, { where: { id: UserId } });

      user = await User.findByPk(UserId);

      res.status(200).json({
        message: `Success edit profile picture for user with id ${UserId}`,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = profileController;
