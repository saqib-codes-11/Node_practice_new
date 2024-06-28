/**
 * @fileoverview Database configuration.
 *
 * This file is responsible for configuring the database connection.
 * It is imported into and run in the server.js file.
 */
const { Sequelize } = require("sequelize");

/** Get database credentials from environment. */
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

/** Create new sequelize database instance. */
let sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 10,
    match: /.*/,
  },
});

/** Function to connect to the database. */
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

module.exports = { sq: sequelize, connectToDatabase };
