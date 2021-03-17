const express = require('express');

const router = express.Router();

const Quiz = require('../models/quiz');

router.get("/getQuizzes", async (request,response) => {
    Quiz.find()
    .then(result => response.status(200).json(result))
    .catch(err => response.status(500).send(err));
});

router.post('/createQuiz', (req, res) => {
    Quiz.create(req.body)
    res.send("Body Recieved");
});

module.exports = router;