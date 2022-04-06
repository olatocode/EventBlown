/** @format */
const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route');
const eventRouter = require('./routes/event.route');

dotenv.config();
const app = express();

app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

const connect_MongoDB = require('./database/mongodb');
const connect_PostgresDB = require('./database/postgresdb');
const { PORT } = process.env;

app.use('/api/v1', userRouter);
app.use('/api/v1', eventRouter);
// app.use(require("./routes/index"))
// app.use('/auth', require('./routes/auth'))

// Connect Database
connect_MongoDB;
connect_PostgresDB;
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`EventBlown is running on port ${PORT}`);
});

//module.exports = app;
