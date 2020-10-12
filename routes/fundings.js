const { Router } = require("express");
const s3 = require("../s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const FundingController = require("../controllers/funding-controller");

const diskStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads");
  },
  filename: function (req, file, callback) {
    uidSafe(24).then(function (uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  },
});

const uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152,
  },
});

const router = Router();

router.get("/", FundingController.getAllFundings);
router.get("/:id", FundingController.getOneFunding);
router.post("/:fundingId/donations", FundingController.createDonation);
router.post(
  "/",
  uploader.single("file"),
  s3.upload,
  FundingController.createFunding
);

module.exports = router;
