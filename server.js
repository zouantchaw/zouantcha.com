const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// built in node module that comes with node.js
const path = require('path')

// initialize express app 
const app = express();

// define a port
const PORT = process.env.PORT || 8080;

const MONGODB_URI = 'mongodb+srv://zouantcha:MongoDbTest123@zouantcha-comtestdb.tbi8m.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!')
})

// Schema 
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

//Model 
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//Saving data to Mongoose db 


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

app.listen(PORT, console.log(`Server is starting at ${PORT}`));