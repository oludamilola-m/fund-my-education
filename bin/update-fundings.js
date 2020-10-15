const { Funding, Donation, User } = require("../db/models");

Funding.findAll().then((fundings) => {
  fundings.forEach(async (funding) => {
    await funding.updateProgress();
  });
});
