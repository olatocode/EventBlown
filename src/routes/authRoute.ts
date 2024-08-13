/** @format */

import express from 'express';
const router = express.Router();
import { addUser, userLogin } from '../controllers/authController';

router.post('/register', addUser);
router.post('/login', userLogin);


export default router;
