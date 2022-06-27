const express = require('express');
const router = express.Router();

const user = require('../controller/userController.js');

router.get('/abc', user.userList);


module.exports = router