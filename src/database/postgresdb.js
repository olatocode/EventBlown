/** @format */

// config/database.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DBCONLINK
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.log(error.message);
  });

module.exports = sequelize;
