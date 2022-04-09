const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const env = require('dotenv').config()
const routes = require('../routes/index')

//Create express app
const app = express();


//Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Middleware
app.use(express.json())

app.use(cors())

app.use('/api/v1', routes.router)

function startServer() {
    //Starting server
    app.listen(process.env.PORT, console.log("Listening on port 5000"));
}

module.exports = {
    startServer
}