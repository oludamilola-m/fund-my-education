var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const fundingRoutes = require("./routes/fundings");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/fundings", fundingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);

app.get("*", (req, res) => {
  res.sendfile(path.join((__dirname = "client/build/index.html")));
});

//build mode
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/public/index.html"));
// });
module.exports = app;
