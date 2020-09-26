const { Router } = require("express");
const FundingController = require("../controllers/funding-controller");

const router = Router();

router.get("/", FundingController.getAllFundings);

module.exports = router;
