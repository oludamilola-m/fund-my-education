const { User } = require("../db/models");
const bc = require("../bc.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

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
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).json({ user: user, token: token });
      } else {
        res.status(401).json({ error: err.message });
      }
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: "Could not log in" });
    }
  }
}

module.exports = AuthController;
