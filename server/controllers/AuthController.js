const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await User.create({ username, email, password });

      res.status(201).json({
        message: "Success Register",
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "InvalidLogin" };

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: "LoginError" };

      if (!compare(password, user.password)) throw { name: "LoginError" };

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.email,
          email: payload.email,
          password: "password_google",
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async discordCallback(req, res, next) {
    const { code } = req.body; // Ambil kode dari body permintaan
    try {
      console.log("Received code:", code); // Log kode yang diterima
      const tokenResponse = await axios.post(
        "https://discord.com/api/oauth2/token",
        new URLSearchParams({
          client_id: "1291500997352493077",
          client_secret: "WIwLNp3O2R5RwSGFOFvzzcTfiimR8xlQ",
          grant_type: "authorization_code",
          code,
          redirect_uri: "http://localhost:5173/auth/discord/callback",
          scope: "identify email",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      const userInfoResponse = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = userInfoResponse.data;

      const [dbUser, created] = await User.findOrCreate({
        where: { email: user.email },
        defaults: {
          username: user.username || user.email,
          email: user.email,
          password: "password_discord",
        },
      });

      const jwtToken = signToken({
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username,
      });

      res.status(200).json({
        access_token: jwtToken,
      });
    } catch (error) {
      console.error("Error in discordCallback:", error.response?.data || error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = AuthController;
