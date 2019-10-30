const express = require('express')
const db = require('../data/db')

const router = express.Router()

router.use(express.json())

// Retrieving all the comments for a specified post
router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
        .then(data => {
            if (data.length) {
                res.status(200).json(data)              
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `The post with ID ${id} does not exist.`
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "The comments information could not be retrieved",
                error
            })
        })
})

// Creating a new comment in a post
router.post('/:id/comments', (req, res) => {
    const { id } = req.params
    const comment = {
        text: req.body.text,
        post_id: id,
    }
    if (comment.text) {
        db.findById(id)
            .then(post => {
                if (post.length) {
                    db.insertComment(comment)
                        .then(data => {
                            db.findCommentById(data.id)
                                .then(commentArray => {
                                    res
                                        .status(201)
                                        .json(commentArray[0])
                                })
                                .catch(error => {
                                    res
                                        .status(500)
                                        .json({
                                            success: false,
                                            message: `Could not return the newly created comment`,
                                            error
                                        })
                                })
                        })
                        .catch(error => {
                            res
                                .status(500)
                                .json({
                                    success: false,
                                    message: "There was an error while saving the comment to the database.",
                                    error
                                })
                        })
                }
                else {
                    res
                        .status(404)
                        .json({
                            success: false,
                            message: `The post with specified id ${id} does not exist.`
                        })
                }
            })
            .catch(error => {
                res
                    .status(500)
                    .json({
                        success: false,
                        message: "There was an error while saving the comment to the database.",
                        error
                    })
            })        
    }
    else {
        res
            .status(400)
            .json({
                success: false,
                message: "Please provide the text for the comment."
            })
    }
})

module.exports = router