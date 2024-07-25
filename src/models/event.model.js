/** @format */


const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgresdb'); // Import the Sequelize configuration

const Event = sequelize.define('Event', {
  eventId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ticketAmount: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  images: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Event;


