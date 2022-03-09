const { Comment } = require('../models/comment.model');
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

const { filterObj } = require('../util/filterObject');

exports.getAllComment = async (req, res) => {
  try {
    const comment = await Comment.findAll({
      where: { status: 'active' },
      include: [
        {
          model: User,
          include: [
            {
              model: Post
            }
          ]
        }
      ]
    });

    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({
      where: { id: id, status: 'active' },
      include: [
        {
          model: User
        }
      ]
    });

    if (!comment) {
      res.status(404).json({
        status: 'error',
        message: 'Not found ID'
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createComment = async (req, res) => {
  try {
    const { description, userId, postId } = req.body;

    const newComment = await Comment.create({
      description: description,
      userId: userId,
      postId: postId
    });

    res.status(201).json({
      status: 'success',
      data: {
        newComment
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.patchComment = async (req, res) => {
  try {
    const { id } = req.params;

    const data = filterObj(req.body, 'description');

    const comment = await Comment.findOne({
      where: {
        id: id,
        status: 'active'
      }
      // include: [
      //   {
      //     model: User,
      //     include: [
      //       {
      //         model: Comment
      //       }
      //     ]
      //   }
      // ]
    });

    if (!comment) {
      res.status(404).json({
        status: 'error',
        data: {
          comment
        }
      });
      return;
    }

    await comment.update({ ...data });
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({
      where: { id: id, status: 'active' }
    });

    if (!comment) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update post, invalid ID'
      });
      return;
    }

    await comment.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
