const { Funding, Donation, sequelize, Sequelize } = require("../db/models");
require("dotenv").config();
const s3Url = process.env.S3_BUCKET_URL;

class FundingController {
  // GET OR SHOW ALL FUNDINGS
  static async getAllFundings(req, res) {
    try {
      let fundings;
      if (req.query.admin == "true") {
        fundings = await Funding.findAll();
      } else {
        fundings = await Funding.findAll({
          where: Sequelize.literal(
            "approved_at IS NOT NULL AND declined_at IS NULL"
          ),
        });
      }

      res.status(200).json({ fundings: fundings });
    } catch (err) {
      console.log(err);
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

  static async approveFunding(req, res) {
    try {
      const { id } = req.params;
      const funding = await Funding.findOne({ where: { id: id } });
      if (funding) {
        await funding.update({ approved_at: new Date(), declined_at: null });
        return res.status(200).json({ funding: funding });
      }
    } catch (err) {
      return res.status(422).json({ error: "Could not process request" });
    }
  }

  static async declineFunding(req, res) {
    try {
      const { id } = req.params;
      const funding = await Funding.findOne({ where: { id: id } });
      if (funding) {
        await funding.update({ declined_at: new Date(), approved_at: null });
        return res.status(200).json({ funding: funding });
      }
    } catch (err) {
      return res.status(422).json({ error: "Could not process request" });
    }
  }
}

module.exports = FundingController;
