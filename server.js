const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// built in node module that comes with node.js
const path = require('path')

// initialize express app 
const app = express();

// define a port
const PORT = process.env.PORT || 8080;

// HTTP request logger
// Logs every http request
app.use(morgan('tiny'));

// Server Routes
app.get('/api', (req, res) => {
    const data = {
        username: 'testtest',
        age: 23
    };
    res.json(data)
})

app.get('/api/name', (req, res) => {
    const data = {
        username: 'wielfried',
        age: 40
    };
    res.json(data)
})