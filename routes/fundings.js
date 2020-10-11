const { Router } = require("express");
const FundingController = require("../controllers/funding-controller");

const router = Router();

router.get("/", FundingController.getAllFundings);
router.get("/:id", FundingController.getOneFunding);
router.post("/:fundingId/donations", FundingController.createDonation);

module.exports = router;
