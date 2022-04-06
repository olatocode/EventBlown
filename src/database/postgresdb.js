/** @format */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// creating connection:
const pool = new Pool({
  host: process.env.HOST_PG,
  user: process.env.USER_PG,
  port: process.env.PORT_PG,
  password: process.env.PASSWORD_PG,
  database: process.env.DATABASE_PG,
});

pool.query('SELECT NOW()', (err, res) => {
  if (!err) {
    console.log('Connected to PostgresDB');
  } else {
    console.log(err.message);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
