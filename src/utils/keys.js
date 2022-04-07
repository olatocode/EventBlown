/** @format */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  google: {
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
  },
  session: {
    cookie_key: process.env.cookie_key,
  },
};
