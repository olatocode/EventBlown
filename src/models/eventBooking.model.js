/** @format */


const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgresdb'); // Import the Sequelize configuration

const Event = sequelize.define('eventBooking', {
  numberOfTickets: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  amountPerTicket: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  totalAmount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },


});

module.exports = Event;
// class eventBooking {
//   constructor() {
//     this.booking_id = booking_id;
//     this.numberOfTickets = numberOfTickets;
//     this.amountPerTicket = amountPerTicket;
//     this.totalAmount = totalAmount;
//     this.event_id = event_id;
//   }
// }

// module.exports = eventBooking;
