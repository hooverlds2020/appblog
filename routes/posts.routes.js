const express = require('express')

const router = express.Router()

const {
    getAllPost,
    getPostById,
    createPost,
    patchPost,
    deletePost
} = require('../controllers/posts.controller')

router.get('/', getAllPost)

router.get('/:id', getPostById)

router.post('/', createPost)

router.post('/:id', patchPost)

router.delete('/:id', deletePost)


module.exports = { postsRouter: router}