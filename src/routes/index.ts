/** @format */

import express from 'express';
import addUser from '../routes/authRoute';
import userLogin from '../routes/authRoute';

const router = express.Router();

const routes = [{ router: addUser }, { router: userLogin }];

routes.forEach((route) => {
  router.use(route.router);
});

export default router;
