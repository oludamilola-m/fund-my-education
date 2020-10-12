const aws = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});
exports.upload = (req, res, next) => {
  if (!req.file) {
    console.log("req.file us not there ");
    return res.status(422).json({ error: "Please upload image" });
  }
  const { filename, mimetype, size, path } = req.file;
  s3.putObject({
    Bucket: process.env.S3_BUCKET,
    ACL: "public-read",
    Key: filename,
    Body: fs.createReadStream(path),
    ContentType: mimetype,
    ContentLength: size,
  })
    .promise()
    .then(() => {
      console.log("promise worked");
      next();
    })
    .catch((err) => {
      console.log(" err in promise", err);
      res.sendStatus(500);
    });
};
