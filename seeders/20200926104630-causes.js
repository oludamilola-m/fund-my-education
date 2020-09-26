"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const causesData = [];
    for (let i = 0; i <= 20; i++) {
      causesData.push({
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
    await queryInterface.bulkInsert("causes", causesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("causes", null, {});
  },
};
