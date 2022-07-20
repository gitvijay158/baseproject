const express = require('express');
const router = express.Router();

const user = require('../controller/userController.js');
const auth = require('../middleware/auth')

router.get('/userlist', user.userList);
router.post('/adduser', user.adduser);
router.post('/updateuser/:id?', user.updateuser);


router.post('/users', user.user);
router.post('/login', user.login);

router.get('/me', auth, user.profile);

router.post('/logout', auth, user.logout);

router.post('/logoutall', auth, user.logoutall);





module.exports = router