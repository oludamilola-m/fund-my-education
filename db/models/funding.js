"use strict";
const { Model, Sequelize } = require("sequelize");
const db = require("./index.js");
module.exports = (sequelize, DataTypes) => {
  class Funding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    async updateProgress() {
      const fundingDonations = await this.getDonations();

      // write reduce code to sum
      const total = fundingDonations.reduce((accumulator, donation) => {
        return accumulator + donation.amount;
      }, 0);

      // calculate progress and update progress column
      const progress = (total / this.total_amount) * 100;

      // update donated_amount to summed up amount and progress
      this.update({ donated_amount: total, progress: progress.toFixed(2) });
    }
    static associate(models) {
      // define association here
      Funding.hasMany(models.Donation, {
        foreignKey: "fundingId",
      });
      Funding.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
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
      userId: DataTypes.INTEGER,
      approved_at: DataTypes.DATE,
      declined_at: DataTypes.DATE,
      short_description: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.description) {
            return "";
          }
          return `${this.description.slice(0, 147)}...`;
        },
      },
    },
    {
      sequelize,
      modelName: "Funding",
    }
  );

  Funding.afterCreate(async (funding, options) => {
    await funding.update({ progress: 0, donated_amount: 0 });
  });
  return Funding;
};
