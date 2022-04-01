const express = require('express')
const mongoose = require('mongoose')

//Create express app
const app = express();

//Database
mongoose.connect('')

//Middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world!");
})

//Starting server
app.listen(3000, console.log("Listening on port 3000"));