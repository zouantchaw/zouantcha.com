const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');

// Server Routes
router.get('/', (req, res) => {

    BlogPost.find({  })
        .then((data) => {
            console.log('Data', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error', error)
        });
})

router.get('/name', (req, res) => {
    const data = {
        username: 'wielfried',
        age: 40
    };
    res.json(data)
})




module.exports = router;