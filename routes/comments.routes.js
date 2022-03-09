const express = require('express');

const {
  createComment,
  getCommentById,
  getAllComment,
  patchComment,
  deleteComment
} = require('../controllers/comment.controller');

const router = express.Router();

router.get('/', getAllComment);

router.get('/:id', getCommentById)

router.post('/', createComment);

router.patch('/:id', patchComment)

router.delete('/:id', deleteComment)


module.exports = { commentsRouter: router };
