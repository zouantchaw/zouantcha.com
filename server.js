const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// built in node module that comes with node.js
const path = require('path')

// initialize express app 
const app = express();

// define a port
const PORT = process.env.PORT || 8080;

// const MONGODB_URI = 'mongodb+srv://zouantcha:MongoDbTest123@zouantcha-comtestdb.tbi8m.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect('mongodb:http://localhost:8080', {
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
const data = {
    title: "Welcome to my youtube channel",
    body: "I help people do things that I don't know what to do"
}

const newBlogPost = new BlogPost(data); // instance of the model

// newBlogPost.save((error) => {
//     if (error) {
//         console.log('Ooops, something happened');
//     } else {
//         console.log('Data has been saved');
//     }
// });
// .save();


// HTTP request logger
// Logs every http request
app.use(morgan('tiny'));

// Server Routes
app.get('/api', (req, res) => {

    BlogPost.find({  })
        .then((data) => {
            console.log('Data', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error', error)
        });
})

app.get('/api/name', (req, res) => {
    const data = {
        username: 'wielfried',
        age: 40
    };
    res.json(data)
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));