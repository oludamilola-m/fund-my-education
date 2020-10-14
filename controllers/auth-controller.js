const { User } = require("../db/models");
const bc = require("../bc.js");
require("dotenv").config();

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      const result = await bc.compare(password, user.password);

      if (result) {
        res.sendStatus(200);
      } else {
        res.status(422).json({ error: err.message });
      }
    } catch (err) {
      console.log("err: ", err);
      res.status(401).json({ error: "Could not log in" });
    }
  }
}

module.exports = AuthController;
