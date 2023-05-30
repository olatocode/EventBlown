/** @format */

const express = require('express');
const initializePayment = require('../controllers/payment.controller');
const router = express.Router();
const {
  bookEvents,
  bookingPayment,
  paymentVerification,
} = require('../controllers/eventBooking.controller');
const { authenticate } = require('../middleware/auth.middleware');
//  creating route
router.post('/bookEvent', authenticate, bookEvents);
router.post('/payment', authenticate, bookingPayment);
router.get('/verification/payment', authenticate, paymentVerification);
router.post('/acceptpayment', authenticate, initializePayment.acceptPayment);

module.exports = router;
