const express = require('express');
const index = require('./index');
const login = require('../controller/login')
const router = express.Router();

router.use('/users', index.users);
router.use('/quiz', index.quiz);
router.post('/singup', login.signup);
router.post('/login', login.login);

module.exports = router;
