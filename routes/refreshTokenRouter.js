const express = require('express');
const router = express.Router();
const { handleRefreshAccessToken } = require('../controllers/refreshAccessToken');

router.get('/', handleRefreshAccessToken);

module.exports = router;