const express = require('express');
const posts = require('../data/seeds/01-posts')
const db = require('../data/db')

const router = express.Router()

router.use(express.json())

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
//Basic get request
router.get('*', (req, res) => {
    res.json("This post shouldn't not be hilarious")
})

module.exports = router