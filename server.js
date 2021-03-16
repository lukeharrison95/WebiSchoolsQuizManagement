const express = require('express');
const app = express();


app.get('/', (req,res) =>{
    res.send('Master!')
})

app.listen(9090);