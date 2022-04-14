/** @format */

const eventBooking = require('../models/eventBooking.model');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const db = require('../database/postgresdb');

// const { validateeventBooking } = require('../middleware/validiate.middleware');

// booking an event
const bookEvents = async (req, res, next) => {
  try {
    const { numberOfTickets, amountPerTicket } = req.body;
    // validating reg.body with joi
    // await validatebooking.validateAsync(req.body);

    let totalAmount = numberOfTickets * amountPerTicket;
    // booking
    const newbooking = await db.query(
      'INSERT INTO eventBooking ( numberOfTickets, amountPerTicket, totalAmount, events_id) VALUES ($1, $2, $3, 4$) RETURNING *',
      [numberOfTickets, amountPerTicket, totalAmount, events_id]
    );
    return res.status(201).json({
      message: 'Events booked',
      newbooking: newbooking.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  booking payment with flutterwave

const bookingPayment = async (req, res, next) => {
  try {
    const { id } = req.headers;
    const booking = await db.query('SELECT id FROM eventBooking');
    const data = await axios({
      url: 'https://api.flutterwave.co/transaction/initialize',
      method: 'post',
      headers: {
        Authorization: `Bearer ${process.env.Flutterwave_Secret}`,
      },
      data: {
        email: 'awosolat@gmail.com',
        amount: '8000000',
      },
    });
    return res.status(200).json({
      data: data.data.data,
      bookings: booking.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//   making payment using flutterwave
const paymentVerification = async (req, res, next) => {
  try {
    const { reference } = req.query;
    const data = await axios({
      url: `https://api.flutterwave.co/transaction/verify/${reference}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.Flutterwave_Secret}`,
      },
      data: {
        email: 'awosolat@gmail.com',
        amount: '8000000',
      },
    });
    return res.status(200).json({
      data: data.data.data.gateway_response,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  bookEvents,
  bookingPayment,
  paymentVerification,
};
