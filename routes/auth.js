const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/auth-controller.js");

router.post("/", AuthController.loginUser);

module.exports = router;
