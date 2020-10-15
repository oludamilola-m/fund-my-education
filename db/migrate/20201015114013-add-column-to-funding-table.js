"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Fundings", "approved_at", {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("Fundings", "declined_at", {
      type: Sequelize.DATE,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Fundings", "approved_at", {
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("Fundings", "declined_at", {
      type: Sequelize.DATE,
    });
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
