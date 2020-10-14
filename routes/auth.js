const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/auth-controller.js");

router.post("/login", AuthController.login);

module.exports = router;
