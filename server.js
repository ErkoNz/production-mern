
// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080

const routes = require('./route/api')
const MONGODB_URI = 'mongodb+srv://erkon:asdf1234@cluster0.1ybut.mongodb.net/firstdb?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI || 'mongodb://localhost/mern_erkon', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("mongoose is connected!")
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

//HTTP request logger
app.use(morgan('tiny'))
app.use('/api', routes)



app.listen(PORT, console.log(`Server is starting at ${PORT}`))