/** @format */

const express = require('express');
const router = express.Router();
const User = require('../controllers/user.controller');
const { initKeycloak, getKeycloak } =
  require('../config/keycloak.config').getKeycloak;

router.post('/createUser', getKeycloak.protect('User'), User.addUser);
router.post('/userLogin', User.userLogin);

module.exports = router;
