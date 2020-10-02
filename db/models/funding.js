"use strict";
const { Model, Sequelize } = require("sequelize");
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
  }
  Funding.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      image_url: DataTypes.STRING,
      total_amount: DataTypes.FLOAT,
      donated_amount: DataTypes.FLOAT,
      progress: DataTypes.FLOAT,
      short_description: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.description.slice(0, 147)}...`;
        },
      },
    },
    {
      sequelize,
      modelName: "Funding",
    }
  );
  return Funding;
};
