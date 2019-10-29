const express = require('express');
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

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(data => {
            if (data) {
                res
                    .status(200)
                    .json({
                        success: true,
                        message: `The post with ID ${id} has been deleted`
                    })
            }
            else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: `The post with ID ${id} does not exist.`
                    })
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "The post cannot be removed",
                error
            })
        })
})

router.put('/:id', (req, res) => {
    const { title, contents } = req.body
    const { id } = req.params
    if (title && contents) {
        db.update(id, req.body)
            .then(data => {
                if (data) {
                    res
                        .status(200)
                        .json({
                            success: true,
                            message: `The post with ID ${id} has been updated`,
                            data
                        })
                }
                else {
                    res
                        .status(404)
                        .json({
                            success: false,
                            message: `The post with ID ${id} does not exist`
                        })
                }
            })
            .catch(error => {
                res
                    .status(500)
                    .json({
                        success: false,
                        message: "The post information could not be modified.",
                        error
                    })
            })
    }
    else {
        res
            .status(400)
            .json({
                success: false,
                message: "Please provide the title and contents for the post."
            })
    }
})
module.exports = router