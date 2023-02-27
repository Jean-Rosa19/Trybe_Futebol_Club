'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
