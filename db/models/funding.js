'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Funding.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    total_amount: DataTypes.FLOAT,
    donated_amount: DataTypes.FLOAT,
    progress: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Funding',
  });
  return Funding;
};