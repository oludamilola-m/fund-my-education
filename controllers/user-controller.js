const { User } = require("../db/models");
const bc = require("../bc.js");

class UserController {
  static async createUser(req, res) {
    console.log("na request be this", req.body);
    const { first_name, last_name, email, password } = req.body;

    try {
      const hashedPassword = await bc.hash(password);

      const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        user,
      });
    } catch (err) {
      console.log("controller", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
