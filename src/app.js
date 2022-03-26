/** @format */

const express = require('express');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`EventBlown is running on port ${PORT}`);
});
