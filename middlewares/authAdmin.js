const jwt = require("jsonwebtoken");
require("dotenv").config();

const authAdmin = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(401).send({ error: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ error: "token expired" });
      }
      return res.status(401).send({ error: "Unauthorized." });
    }
    if (decoded.admin_username !== process.env.ADMIN_USERNAME) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    next();
  });
};

module.exports = authAdmin;
