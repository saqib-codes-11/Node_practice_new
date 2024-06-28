/**
 * @fileoverview User model.
 * 
 * The model is responsible for handling the data of the application.
 * It interacts with the database directly with sequelize.
 * 
 * Sequelize uses this model to create the table in the database.
 */
const { sq } = require("../database");
const { DataTypes } = require("sequelize");

const User = sq.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

sq.sync().then(() => {
  console.log("User table created");
});

module.exports = User;
