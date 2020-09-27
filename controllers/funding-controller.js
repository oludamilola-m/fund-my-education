const { Funding } = require("../db/models");

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
      return res.status(422).json({ error: "Could not process request" });
    }
  }
}

module.exports = FundingController;
