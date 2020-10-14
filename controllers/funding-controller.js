const { Funding, Donation } = require("../db/models");
require("dotenv").config();
const s3Url = process.env.S3_BUCKET_URL;

class FundingController {
  // GET OR SHOW ALL FUNDINGS
  static async getAllFundings(req, res) {
    try {
      const fundings = await Funding.findAll();
      res.status(200).json({ fundings: fundings });
    } catch (err) {
      res.status(422).json({ error: err.message });
    }
  }

  // GET OR SHOW A SPECIFIC  FUNDING
  static async getOneFunding(req, res) {
    try {
      const { id } = req.params;

      const funding = await Funding.findOne({
        where: { id: id },
      });

      if (funding) {
        return res.status(200).json({ funding: funding });
      }
      return res.status(404).json({ error: "Funding not found" });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ error: "Could not process request" });
    }
  }

  // CREATE DONATION
  static async createDonation(req, res) {
    try {
      const { fundingId } = req.params;

      const {
        donor_first_name,
        donor_last_name,
        donor_phone_number,
        amount,
        donor_email,
        payment_reference,
      } = req.body;

      await Donation.create({
        donor_first_name,
        donor_last_name,
        donor_phone_number,
        amount,
        donor_email,
        payment_reference,
        fundingId,
      });

      res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // CREATE A SINGLE FUNDING
  static async createFunding(req, res) {
    try {
      const imageUrl = `${s3Url}${req.file.filename}`;
      const { title, amount, description } = req.body;
      const funding = await Funding.create({
        title: title,
        total_amount: amount,
        description: description,
        image_url: imageUrl,
        userId: req.userId,
      });

      res.status(201).json({
        funding: funding,
      });
    } catch (err) {
      console.log("err: ", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = FundingController;
