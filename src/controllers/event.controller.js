/** @format */

const validateEvent = require('../middleware/validate.middleware');
const db = require('../database/postgresdb');
const dotenv = require('dotenv');
dotenv.config();

exports.addEvent = async (req, res, next) => {
  try {
    const { name, location, amount, image } = req.body;
    // validating reg.body with joi
     await validateEvent.validateAsync(req.body);

    //  Creating new Event
    const { rows } = await db.query(
      'INSERT INTO events (name, location, amount, image) VALUES ($1, $2, $3, $4)',
      [name, location, amount, image]
    );
    return res.status(201).json({
      message: 'Events created Successfully',
      body: {
        Events: { name, location, amount, image },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
