/** @format */

const express = require('express');
const router = express.Router();
const Admin = require('../controllers/admin.controller');
const { initKeycloak, getKeycloak } =
  require('../config/keycloak.config').getKeycloak;

router.post('/createAdmin', Admin.addAdmin);
router.post('/adminLogin', Admin.adminLogin);

module.exports = router;
