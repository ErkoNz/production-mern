const express = require('express')

const router = express.Router()

const BlogPost = require('../models/blogPost')


router.get('/', (req, res) => {
    BlogPost.find({})
        .then((data) => {
            console.log('Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error: ', error)
        })
})

router.post('/save', (req, res) => {
    console.log("BOdy: ", req.body)
    const data = req.body
    const newBlogPost = new BlogPost(data)
    //.save

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internatl serversdare errors' })
            return
        }
        return res.json({
            msg: 'Your data has been saved'
        })
    })
})


router.get('/name', (req, res) => {
    const data = {
        username: "Zabransky",
        age: 24
    }
    res.json(data)
})


// module.exports = BlogPost
module.exports = router