const express = require('express');
const index = require('./index');

const router = express.Router();

router.use('/users', index.users);

module.exports = router;
