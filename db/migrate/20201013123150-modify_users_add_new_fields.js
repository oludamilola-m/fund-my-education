"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "phone_number", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "address", {
      type: Sequelize.STRING,
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "phone_number");
    await queryInterface.removeColumn("Users", "address");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
