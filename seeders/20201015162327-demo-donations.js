"use strict";
const faker = require("faker");
const { Funding, Donation, User } = require("../db/models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Donations", null, {});
    const donationsData = [];
    const fundings = await Funding.findAll();
    const fundingIds = fundings.map((f) => f.id);
    for (let i = 0; i <= 50; i++) {
      let fundingId = fundingIds.random();
      donationsData.push({
        donor_first_name: faker.name.firstName(),
        donor_last_name: faker.name.lastName(),
        donor_phone_number: faker.phone.phoneNumber(),
        amount: faker.random.number({
          min: 50,
          max: 1000,
        }),
        donor_email: faker.internet.email(),
        payment_reference: faker.random.alphaNumeric(),
        fundingId: fundingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Donations", donationsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Donations", null, {});
  },
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
