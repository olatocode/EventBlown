/** @format */

import express from 'express';
const router = express.Router();
import { addUser, userLogin } from '../controllers/authController';

router.post('/auth/register', addUser);
router.post('/auth/login', userLogin);


export default router;
