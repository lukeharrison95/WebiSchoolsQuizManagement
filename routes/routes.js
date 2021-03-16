const express = require('express');
const router = express.Router();
const index = require('./index');



router.use('/users', index.users);

module.exports = router;