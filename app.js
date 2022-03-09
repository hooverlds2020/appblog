const express = require('express')

//util
const { sequelize } = require('./util/database')

//Routes
const { usersRouter } = require('./routes/users.routes')
const { postsRouter } = require('./routes/posts.routes')
const { commentsRouter } = require('./routes/comments.routes')
const { User } = require('./models/user.model')
const { Post } = require('./models/post.model')
const { Comment } = require('./models/comment.model')

// Init express app
const app = express() 

//Enable JSON
app.use(express.json())

//Init bcryptjs
//const bcryptjs = require('bcryptjs')

//Endpoints
app.use('/api/v1/users', usersRouter )
app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/comments', commentsRouter)

sequelize
    .authenticate()
    .then(()=> console.log('ConnectionDB'))
    .catch(error => console.log(error))

//relations
User.hasMany(Post)
Post.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)



sequelize
    .sync()
    .then(()=> console.log('DB sync'))
    .catch(error => console.log(error))

// app.listen(4000, () => {
//     console.log('Express app running')
// })

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});

