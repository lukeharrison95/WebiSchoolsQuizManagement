const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');


const app = express();

app.use(express.json());

mongoose
 .connect('mongodb://localhost:27017/quiz-users', {useNewUrlParser: true})
 .then(() => {
  console.log('Connected to the Database successfully');
 });

app.use('/quizmaster', routes)

app.listen(9090);