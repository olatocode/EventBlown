/** @format */
const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use('/api/v1', userRouter);

module.exports = app;
