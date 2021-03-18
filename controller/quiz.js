const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const login = require('./login');

const router = express.Router();

const Quiz = require('../models/quiz');

router.get("/getQuizzes", async (request,response) => {
    Quiz.find()
    .then(result => response.status(200).json(result))
    .catch(err => response.status(500).send(err));
});

router.get("/getQuiz/:_id", (req,res) =>{
    var id= req.params._id;
    var o_id = new ObjectId(id);
    Quiz.findById(o_id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).send(err));
})

router.post('/createQuiz', (req, res) => {
    Quiz.create(req.body)
    res.send("Body Recieved");
});

router.patch('/editQuiz/:id',  async (req, res) =>{
    try{
        const UpdatedQuiz = await Quiz.updateOne(
            {_id: req.params.id},
            { $set:{title: req.body.title, questions: req.body.questions}}
        );
        res.json(UpdatedQuiz);
    } catch (err){
        res.json({ message: err});
    }
});

router.delete('/deleteQuiz/:id',  async (req, res) =>{
    try{
        const deletedQuiz = await Quiz.remove( {_id: req.params.id});
        res.json(deletedQuiz);
    } catch (err){
        res.json({ message: err});
    }
});

module.exports = router;