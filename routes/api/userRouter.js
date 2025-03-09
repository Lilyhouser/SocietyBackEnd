const express=require('express');
const router = express.Router();
const {
    getAllUser, getUser
} = require('../../controllers/userController');

router.route('/').get(getAllUser);

router.route('/:id').get(getUser);

module.exports = router;