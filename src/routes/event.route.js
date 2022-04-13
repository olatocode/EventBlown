/** @format */

//  require dependencies
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { addEvent, fetchAllEvents } = require('../controllers/event.controller');
const upload = require('../utils/multer');
//  creating  route
router.post(
  '/createEvent',
  // authenticate,
  // authorize,
  upload.array('pictures'),
  addEvent
);
router.get('/showAllEvents', fetchAllEvents);

//    exporting modules
module.exports = router;
