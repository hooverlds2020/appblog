const { Comment } = require('../models/comment.model');
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

// Utils
const { filterObj } = require('../util/filterObject');


exports.getAllPost = async (req, res) => {
  try {
    const post = await Post.findAll({
      where: { status: 'active' },
      include: [
        {
          model: User,
          include: [
            {
              model: Comment
            }
          ]
        }
      ]
    });
    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: { id: id, status: 'active' },
      include: [
        {
          model: User,
          include: [
            {
              model: Comment
            }
          ]
        }
      ]
    });

    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId, imgUrl } = req.body;

    const newPost = await Post.create({
      title: title,
      content: content,
      userId: userId,
      imgUrl: imgUrl
    });

    res.status(201).json({
      status: 'success',
      data: {
        newPost
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.patchPost = async(req, res) => {
  try {
    const { id } = req.params
    const data = filterObj(req.body, 'title', 'content', 'userId', 'imgUrl')    
    
        const post = await Post.findOne({
          where:
          { 
            id:id, 
            status: 'active'
          }, 
          include: [
            {
              model: User,
              include: [
                {
                  model: Comment
                }
              ]
            }
          ]
         })

         if(!post){
          res.status(404).json({
            status: 'error',
            message: 'Cant update post, invalid ID'
          });
          return;
         }

         await post.update({ ...data})

         res.status(204).json({ status: 'success'})
    }catch (error) {
    console.log(error)
  }

}

exports.deletePost = async(req, res) =>{
  try {
    const { id } = req.params

    const post = await Post.findOne({ where: { id:id, status: 'active' }})

    if(!post){
      res.status(404).json({
        status: 'error',
        message: 'Cant update post, invalid ID'
      });
      return;
    }

    await post.update({status: 'deleted'})

    res.status(204).json({ status: 'success'})
  } catch (error) {
    console.log(error)
  }
}
