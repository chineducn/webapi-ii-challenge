const express = require('express')
const db = require('../data/db')

const router = express.Router()

router.use(express.json())

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

router.post('*', (req, res) => {
    res.json("This comment can't be unreal")
})

module.exports = router