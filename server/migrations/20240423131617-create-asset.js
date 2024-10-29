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
      site: {
        type: Sequelize.STRING
      },
      namaAsset: {
        type: Sequelize.STRING
      },
      kodePN: {
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
      actionPlan: {
        type: Sequelize.STRING
      },
      userDept: {
        type: Sequelize.STRING
      },
      depresiasi: {
        type: Sequelize.INTEGER
      },
      remark: {
        type: Sequelize.STRING
      },
      areaKerja: {
        type: Sequelize.STRING
      },
      benefit: {
        type: Sequelize.STRING
      },
      realisasiAsset: {
        type: Sequelize.DATE
      },
      planRealisasi: {
        type: Sequelize.DATE
      },
      statusApproval: {
        type: Sequelize.STRING
      },
      statusRealisasi: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
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