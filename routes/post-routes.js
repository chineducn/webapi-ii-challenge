const express = require('express');
const posts = require('../data/seeds/01-posts')
const db = require('../data/db')

const router = express.Router()

router.use(express.json())

// Get all posts
router.get('/', (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "The posts information could not be retrieved",
                error
            })
        })
})

// Get a post by specified id
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            if (post.length) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    success: false,
                    message: `The post with id ${req.params.id} does not exist.`
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "The post information could not be retrieved.",
                error
            })
        })
})
//Basic get request
router.get('*', (req, res) => {
    res.json("This post shouldn't not be hilarious")
})

module.exports = router