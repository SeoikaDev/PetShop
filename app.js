const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const env = require('dotenv').config()
const productRoutes = require('./routes/ProductRoutes')
const userRoutes = require('./routes/UserRoutes')
const authRoutes = require('./routes/AuthRoutes')


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

app.use('/api/v1', productRoutes.router, userRoutes.router, authRoutes.router)

//Starting server
app.listen(3000, console.log("Listening on port 3000"));