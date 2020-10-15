const { User } = require("../db/models");
const bc = require("../bc.js");
const generateToken = require("../generateToken");
require("dotenv").config();

class UserController {
  static async createUser(req, res) {
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
      // create a token

      const token = generateToken({ id: user.id });

      return res.status(201).json({
        token: token,
        user: user,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
