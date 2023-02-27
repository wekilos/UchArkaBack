'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      relation: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      birthPlace: {
        type: Sequelize.TEXT
      },
      job: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.TEXT
      },
      jail: {
        type: Sequelize.BOOLEAN
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Infos');
  }
};