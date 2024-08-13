/** @format */
import { app } from './app';
import logger from './utils/logger';
const connect_MongoDB = require('./config/database/mongodb');

// Connect Database
connect_MongoDB;

const { PORT } = process.env;
app.listen(PORT, () => {
  logger.info(`EventBlown is running on port http://localhost:${PORT}`);
});
