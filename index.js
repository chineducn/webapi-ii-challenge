const express = require('express')
const postRoutes = require('./routes/post-routes')
const commentRoutes = require('./routes/comment-routes')

const app = express()
const port = process.env.PORT || 7800

app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})