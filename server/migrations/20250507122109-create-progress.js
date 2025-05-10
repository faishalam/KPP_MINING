'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Progresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dept: {
        type: Sequelize.STRING
      },
      projectNumber: {
        type: Sequelize.STRING
      },
      projectDescription: {
        type: Sequelize.STRING
      },
      totalBudget: {
        type: Sequelize.STRING
      },
      totalRecipt: {
        type: Sequelize.STRING
      },
      totalPr: {
        type: Sequelize.STRING
      },
      poOutstanding: {
        type: Sequelize.STRING
      },
      prOutstanding: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.STRING
      },
      bulanRealisasi: {
        type: Sequelize.DATE
      },
      remarks: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      progressCapex: {
        type: Sequelize.STRING
      },
      assetNumber: {
        type: Sequelize.STRING
      },
      posisiUnit: {
        type: Sequelize.STRING
      },
      estimateTimeArrival: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Progresses');
  }
};