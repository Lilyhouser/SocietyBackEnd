const express = require('express');
const router = express.Router();
const { handleSignup } = require('../controllers/signupController.js');

router.route('/').post(handleSignup);

module.exports = router;