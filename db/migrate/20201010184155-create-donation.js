"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Donations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      donor_first_name: {
        type: Sequelize.STRING,
      },
      donor_last_name: {
        type: Sequelize.STRING,
      },
      donor_email: {
        type: Sequelize.STRING,
      },
      donor_phone_number: {
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      payment_reference: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fundingId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Fundings",
          key: "id",
          as: "fundingId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Donations");
  },
};
