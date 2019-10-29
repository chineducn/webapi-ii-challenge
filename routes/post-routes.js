const express = require('express');
const posts = require('../data/seeds/01-posts')
const db = require('../data/db')
const commentRoutes = require('./comment-routes')


const router = express.Router()

router.use(express.json())
router.use('/:id/comments', commentRoutes)

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

router.post('/', (req, res) => {
    const { title, contents } = req.body
    if (title && contents) {
        db.insert(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(error => {
                res.status(500).json({
                    success: false,
                    message: "There was an error while saving the post to the database",
                    error
                })
            })
    } 
    else {
        res.status(400).json({
            success: false,
            message: "Please provide the title and contents for the post."
        })
    }
})
//Basic get request
router.get('*', (req, res) => {
    res.json("This post shouldn't not be hilarious")
})

module.exports = router