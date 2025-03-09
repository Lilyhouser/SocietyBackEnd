const express = require('express');
const router = express.Router();
const handleLogout = require('../controllers/logoutController');

router.post('/:username', handleLogout);

module.exports = router;