const { User } = require("../db/models");
const bc = require("../bc.js");
require("dotenv").config();

const generateToken = require("../generateToken");

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(422).json({ error: "Invalid email / password" });
      }
      const result = await bc.compare(password, user.password);

      if (result) {
        const token = generateToken({ id: user.id });
        res.status(200).json({ user: user, token: token });
      } else {
        res.status(401).json({ error: err.message });
      }
    } catch (err) {
      res.status(422).json({ error: "Could not log in" });
    }
  }

  static async adminLogin(req, res) {
    try {
      const { username, password } = req.body;

      //check the username again env username &password
      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = generateToken({ username: process.env.ADMIN_USERNAME });
        res.status(200).json({ token: token, admin: true });
      } else {
        res.status(401).json({ error: "invalid" });
      }
    } catch (err) {
      res.status(422).json({ error: "Could not log in" });
    }
  }
}

module.exports = AuthController;
