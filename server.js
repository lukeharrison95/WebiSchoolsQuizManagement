const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/users');
const routes = require('./routes/routes');
const{ port } = require('./config/generalConfig.json');

const app = express();

mongoose
 .connect('mongodb://localhost:27017/quiz-users', {useNewUrlParser: true})
 .then(() => {
  console.log('Connected to the Database successfully');
 });

app.use(express.json());
app.use('/quizmaster', routes)

app.use(async (req, res, next) => {
    if(req.headers["x-access-token"]){
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        if(exp < Date.now().valueOf()/1000){
            return res.status(401).json({ error: "Token Expired, please login again"});
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
    }
});


app.listen(port, () => {
    console.log('server is running on port ' +  port)
});