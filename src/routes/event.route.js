/** @format */

const Event = require('../controllers/event.controller');
const express = require('express');
const router = express.Router();

router.post('/createEvents', Event.addEvent);

module.exports = router;
