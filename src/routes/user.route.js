/** @format */

const User = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/createUser', User.addUser);
router.post('/userLogin', User.userLogin);

module.exports = router;
