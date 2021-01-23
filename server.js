// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// built in node module that comes with node.js
const path = require('path')

// initialize express app 
const app = express();

// define a port
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api')

// const MONGODB_URI = 'mongodb+srv://zouantcha:MongoDbTest123@zouantcha-comtestdb.tbi8m.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect('mongodb://localhost/test_mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!')
});

// Making all the requests that are coming in as json or as urlencoded 
// and make them available on the request.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// HTTP request logger
// Logs every http request
app.use(morgan('tiny'));
app.use('/api', routes);


app.listen(PORT, console.log(`Server is starting at ${PORT}`));