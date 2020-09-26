"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fundingsData = [];
    for (let i = 0; i <= 20; i++) {
      fundingsData.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        image_url: faker.image.avatar(),
        total_amount: faker.random.number(),
        donated_amount: 0,
        progress: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Fundings", fundingsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Fundings", null, {});
  },
};
