const express = require('express');
const router = express.Router();

const user = require('../controller/userController.js');

router.get('/userlist', user.userList);
router.post('/adduser', user.adduser);
router.post('/updateuser', user.updateuser);


module.exports = router