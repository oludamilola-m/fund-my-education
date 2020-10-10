"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Donation.belongsTo(models.Funding, {
        foreignKey: "fundingId",
        onDelete: "CASCADE",
      });
    }
  }
  Donation.init(
    {
      donor_first_name: DataTypes.STRING,
      donor_last_name: DataTypes.STRING,
      donor_phone_number: DataTypes.STRING,
      amount: { type: DataTypes.FLOAT, allowNull: false },
      email: DataTypes.STRING,
      payment_reference: { type: DataTypes.STRING, allowNull: false },
      fundingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Donation",
    }
  );
  return Donation;
};
