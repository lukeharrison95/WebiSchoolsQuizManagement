const express = require('express')
const router = express.Router();

const User = require('../models/users');

router.get("/getUsers", async (request,response) => {
    try {
        var result = await User.find().exec();
        response.send(result);
    } catch (error){
        response.status(500).send(error);
    }
});

module.exports = router;
