/** @format */

const express = require('express');
const router = express.Router();
const Admin = require('../controllers/admin.controller');

router.post('/createAdmin', Admin.addAdmin);
router.post('/adminLogin', Admin.adminLogin);

module.exports = router;
