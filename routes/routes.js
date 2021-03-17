const express = require('express');
const index = require('./index');

const router = express.Router();

router.use('/users', index.users);
router.use('/quiz', index.quiz);

module.exports = router;
