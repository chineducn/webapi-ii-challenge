const express = require('express')
const comments = require('../data/seeds/02-comments')

const router = express.Router()

router.use(express.json())

router.get('*', (req, res) => {
    res.json("This comment can't be unreal")
})

module.exports = router