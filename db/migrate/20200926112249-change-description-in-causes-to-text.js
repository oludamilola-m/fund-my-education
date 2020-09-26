"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    await queryInterface.changeColumn(
      "causes",
      "description",
      {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      {
        transaction,
      }
    );
    await transaction.commit();
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    await queryInterface.changeColumn(
      "causes ",
      "description",
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      {
        transaction,
      }
    );
    await transaction.commit();
  },
};
