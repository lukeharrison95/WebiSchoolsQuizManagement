const express = require('express');



const router = express.Router();

const User = require('../models/users');

router.get("/getUsers", async (request,response) => {
    User.find()
    .then(result => response.status(200).json(result))
    .catch(err => response.status(500).send(err));
});

module.exports = router;
