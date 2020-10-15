"use strict";
const faker = require("faker");
const { Funding, Donation, User } = require("../db/models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Fundings", null, {});
    const user1 = await User.findOne({
      where: { email: "sname@sname.com" },
    });
    const user2 = await User.findOne({
      where: { email: "damzy24@yahoo.com" },
    });

    const fundingsData = [];
    for (let i = 0; i <= 10; i++) {
      let user = [user1, user2].random();
      fundingsData.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        image_url: faker.image.avatar(),
        total_amount: faker.random.number({
          min: 10000,
          max: 50000,
        }),
        approved_at: [new Date(), null, null, null, null, null].random(),
        donated_amount: 0,
        progress: 0,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Fundings", fundingsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Donations", null, {});
    await queryInterface.bulkDelete("Fundings", null, {});
  },
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
