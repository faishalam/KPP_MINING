"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Progress.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Progress.init(
    {
      dept: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Departmenet is required",
          },
          notEmpty: {
            msg: "Departmenet is required",
          },
        },
      },
      projectNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Project Number is required",
          },
          notEmpty: {
            msg: "Project Number is required",
          },
        },
      },
      assetNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Asset Number is required",
          },
          notEmpty: {
            msg: "Asset Number is required",
          },
        },
      },
      projectDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Project description is required",
          },
          notEmpty: {
            msg: "Project description is required",
          },
        },
      },
      totalBudget: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total Budget is required",
          },
          notEmpty: {
            msg: "Total Budget is required",
          },
        },
      },
      prOutstanding: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total PR outstanding is required",
          },
          notEmpty: {
            msg: "Total PR outstanding is required",
          },
        },
      },
      poOutstanding: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total PO outstanding is required",
          },
          notEmpty: {
            msg: "Total PO outstanding is required",
          },
        },
      },
      totalRecipt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total Recipt is required",
          },
          notEmpty: {
            msg: "Total Recipt is required",
          },
        },
      },
      totalPr: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total PR is required",
          },
          notEmpty: {
            msg: "Total PR is required",
          },
        },
      },
      balance: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Balance is required",
          },
          notEmpty: {
            msg: "Balance is required",
          },
        },
      },
      bulanRealisasi: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Bulan Realiasasi is required",
          },
          notEmpty: {
            msg: "Bulan Realiasasi is required",
          },
        },
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Remarks is required",
          },
          notEmpty: {
            msg: "Remarks is required",
          },
        },
      },
      progressCapex: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Progress Capex is required",
          },
          notEmpty: {
            msg: "Progress Capex is required",
          },
        },
      },
      posisiUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Posisi Unit is required",
          },
          notEmpty: {
            msg: "Posisi Unit is required",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID is required",
          },
          notEmpty: {
            msg: "User IDis required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Progress",
    }
  );
  return Progress;
};
