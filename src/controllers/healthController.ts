/** @format */

import { Request, Response } from 'express';

const healthCheck = async (req: Request, res: Response) => {
  res.status(200).send('Welcome to EventBlown User Service API!');
};
export { healthCheck };
