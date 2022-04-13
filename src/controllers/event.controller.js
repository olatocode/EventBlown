/** @format */
const Events = require('../models/event.model');
const cloudinaryUploadMethod = require('../utils/cloudinary');
const path = require('path');
const express = require('express');
const router = express.Router();
const AppError = require('../utils/appError');
const upload = require('../utils/multer');
const db = require('../database/postgresdb');

// add new event
exports.addEvent = async (req, res, next) => {
  try {
    const urls = [];
    const files = req.files;
    if (!files) return next(new AppError('No picture attached..', 400));
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinaryUploadMethod(path);

      urls.push(newPath);
    }
    images = urls.map((url) => url.res);

    const { name, location, ticketAmount } = req.body;
    // validating reg.body with joi
    // await validateEvents.validateAsync(req.body);
    const events = await db.query(
      'INSERT INTO Events (name, location, ticketAmount, images) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, location, ticketAmount, images]
    );
    return res.status(201).json({
      message: 'Event  created',
      data: events.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//   fetch all available Events

exports.fetchAllEvents = async (req, res, next) => {
  try {
    const { page } = req.headers;
    // pagination
    const allEvents = await db.query(
      `SELECT * FROM Events Order By id LIMIT 5 OFFSET ${(page - 1) * 5}`
    );
    if (
      allEvents.rows[0] == null ||
      !allEvents.rows[0] ||
      allEvents.rows[0] == []
    ) {
      return res.status(404).json({
        message: 'page not found',
      });
    }
    const count = await db.query('SELECT COUNT(*)FROM events');
    return res.status(200).json({
      message: 'Events fetch successfully',
      count: count.rows[0],
      allEvents: allEvents.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
