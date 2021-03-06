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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test_mern', {
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

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
};

app.listen(PORT, console.log(`Server is starting at ${PORT}`));