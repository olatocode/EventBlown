/** @format */

const express = require('express');
const router = express.Router();
const User = require('../controllers/user.controller');
const { initKeycloak, getKeycloak } =
  require('../config/keycloak.config').getKeycloak;

router.post('/createUser', User.addUser);
router.post('/userLogin', User.userLogin);

router.post('/auth/user/verify', User.verifyEmail);
router.post('/auth/user/resend-verification-mail', User.resendVerificationMail);
router.post('/auth/user/password-reset-url', User.forgetPasswordLink);
router.patch('/auth/user/change-password', User.changePassword);
router.patch('/auth/user/reset-password', User.resetPassword);

module.exports = router;
