/** @format */

const app = require('./app');
const connectDB = require('./database/connectdb');
connectDB;
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`EventBlown is running on port ${PORT}`);
});
