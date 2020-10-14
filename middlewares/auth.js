const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(401).send({ error: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ error: "token expired" });
      }
      return res.status(401).send({ error: "Unauthorized." });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = auth;
