/** @format */
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger  from './utils/logger';
import router from './routes/index';
import healthRouter from './routes/healthRoute';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(
  morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// base url
app.use('/', healthRouter);

// api endpoints
app.use('/api/v1', router);

export { app } ;
