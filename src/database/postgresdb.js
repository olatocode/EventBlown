/** @format */

const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

// // creating connection:
// const pool = new Pool({
//   host: process.env.HOST_PG,
//   user: process.env.USER_PG,
//   port: process.env.PORT_PG,
//   password: process.env.PASSWORD_PG,
//   database: process.env.DATABASE_PG,
// });
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.USER_PG}:${process.env.PASSWORD_PG}@${process.env.HOST_PG}:${process.env.PORT_PG}/${process.env.DATABASE_PG}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
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

// module.exports = pool;
