'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asset.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Asset.init({
    site: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Site is required'
        },
        notEmpty: {
          msg: 'Site is required'
        }
      }
    },
    namaAsset: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama asset is required'
        },
        notEmpty: {
          msg: 'Nama asset is required'
        }
      }
    },
    kodePN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Kode PN is required'
        },
        notEmpty: {
          msg: 'Kode PN is required'
        }
      }
    },
    nilaiAsset: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nilai asset is required'
        },
        notEmpty: {
          msg: 'Nilai asset is required'
        }
      }
    },
    quantityAsset: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Quantity asset is required'
        },
        notEmpty: {
          msg: 'Quantity asset is required'
        }
      }
    },
    totalNilaiAsset: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Total Nilai Asset is required'
        },
        notEmpty: {
          msg: 'Total Nilai Asset is required'
        }
      }
    },
    actionPlan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Action Plan is required'
        },
        notEmpty: {
          msg: 'Action Plan is required'
        }
      }
    },
    userDept : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User Dept is required'
        },
        notEmpty: {
          msg: 'User Dept is required'
        }
      }
    },
    depresiasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 48,
      validate: {
        notNull: {
          msg: 'Depresiasi is required'
        },
        notEmpty: {
          msg: 'Depresiasi is required'
        }
      }
    },
    remark : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Remark is required'
        },
        notEmpty: {
          msg: 'Remark is required'
        }
      }      
    },
    areaKerja : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Area Kerja is required'
        },
        notEmpty: {
          msg: 'Area Kerja is required'
        }
      }
    },
    benefit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Benefit is required'
        },
        notEmpty: {
          msg: 'Benefit is required'
        }
      }
    },
    planRealisasi: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Plan realisasi is required'
        },
        notEmpty: {
          msg: 'Plan realisasi is required'
        }
      }
    },
    realisasiAsset : {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Realisasi Asset is required'
        },
        notEmpty : {
          msg : 'Realisasi Asset is required'
        }
      }
    },  
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'waiting',
      validate: {
        notNull: {
          msg: 'Status is required'
        },
        notEmpty: {
          msg: 'Status is required'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'is required'
        },
        notEmpty: {
          msg: 'is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};