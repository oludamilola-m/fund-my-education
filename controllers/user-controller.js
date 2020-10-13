const { User } = require("../db/models");
const bc = require("../bc.js");

class UserController {
  static async createUser(req, res) {
    console.log("na request be this", req.body);
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      address,
    } = req.body;

    try {
      const hashedPassword = await bc.hash(password);

      const user = await User.create({
        first_name,
        last_name,
        email,
        phone_number,
        address,
        password: hashedPassword,
      });
      return res.status(201).json({
        user,
      });
    } catch (err) {
      console.log("controller", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
