/** @format */

import express from 'express';
const router = express.Router();
const { healthCheck } = require('../controllers/healthController');

router.get('/', healthCheck);


export default router;
