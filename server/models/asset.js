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
    namaAsset: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Nama asset is required'
        }, 
        notEmpty : {
          msg : 'Nama asset is required'
        }
      }
    },
    nilaiAsset: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Nilai asset is required'
        }, 
        notEmpty : {
          msg : 'Nilai asset is required'
        }
      }
    },
    quantityAsset: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Quantity asset is required'
        }, 
        notEmpty : {
          msg : 'Quantity asset is required'
        }
      }
    },
    totalNilaiAsset: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Total Nilai Asset is required'
        }, 
        notEmpty : {
          msg : 'Total Nilai Asset is required'
        }
      }
    },
    depresiasi: {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue: 48,
      validate : {
        notNull : {
          msg : 'Depresiasi is required'
        }, 
        notEmpty : {
          msg : 'Depresiasi is required'
        }
      }
    },
    benefit: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Benefit is required'
        }, 
        notEmpty : {
          msg : 'Benefit is required'
        }
      }
    },
    planRealisasi: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Plan realisasi is required'
        }, 
        notEmpty : {
          msg : 'Plan realisasi is required'
        }
      }
    },
    status : {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue: 'waiting',
      validate : {
        notNull : {
          msg : 'Status is required'
        }, 
        notEmpty : {
          msg : 'Status is required'
        }
      }
    },
    userId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'is required'
        }, 
        notEmpty : {
          msg : 'is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};