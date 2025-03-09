const express = require('express');
const router = express.Router();
const {getMessage} = require('../../controllers/messageController');

router.route('/').get(getMessage);

module.exports = router;