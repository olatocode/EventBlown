/** @format */

const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const eventPool = new Pool({
  connectionString: process.env.DBCONLINK,
  ssl: {
    rejectUnauthorized: false,
  },
});
eventPool.query('SELECT NOW()', (err, res) => {
  if (!err) {
    console.log('Connected to PostgresDB');
  } else {
    console.log(err.message);
  }
});

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };

module.exports = eventPool;
