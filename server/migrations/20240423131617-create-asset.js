'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaAsset: {
        type: Sequelize.STRING
      },
      nilaiAsset: {
        type: Sequelize.INTEGER
      },
      quantityAsset: {
        type: Sequelize.INTEGER
      },
      totalNilaiAsset: {
        type: Sequelize.INTEGER
      },
      depresiasi: {
        type: Sequelize.INTEGER
      },
      benefit: {
        type: Sequelize.STRING
      },
      planRealisasi: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
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
    await queryInterface.dropTable('Assets');
  }
};