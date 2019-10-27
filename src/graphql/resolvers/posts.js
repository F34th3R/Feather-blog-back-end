const Post = require('../../models/post')
const User = require('../../models/user')
const { transformPost } = require('../../helpers/merge')
const { tokenVerify } = require('../../middleware/authMiddleware')

module.exports = {
  // get posts
  posts: async () => {
    const posts = await Post.find().populate('creator')
    return posts.map(post => transformPost(post))
  },
  // get single post
  post: async args => {
    const posts = await Post.findById(args.id).populate('creator')
    return transformPost(posts)
  },
  // create post
  createPost: async (args, req) => {
    tokenVerify(req)
    const { title, image, content } = args.postInput
    const post = new Post({
      title,
      image,
      content,
      creator: req.userId
    })
    let createdPost
    try {
      const result = await post.save()
      createdPost = transformPost(result)
      const creator = await User.findById(req.userId)

      if (!creator) {
        throw new Error('User not found.')
      }
      creator.createdPosts.push(post)
      await creator.save()

      return createdPost
    } catch (err) {
      throw new Error(err)
    }
  },
  // edit post
  editPost: async (args, req) => {
    tokenVerify(req)
    const { title, image, content } = args.postInput

    try {
      await Post.findByIdAndUpdate(args.id, {
        title,
        image,
        content
      })
      const posts = await Post.findById(args.id).populate('creator')
      return transformPost(posts)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  },
  // delete post
  deletePost: async (args, req) => {
    tokenVerify(req)
    try {
      await Post.findByIdAndRemove(args.id)

      const creator = await User.findById(req.userId)
      if (!creator) {
        throw new Error('User not found.')
      }
      const pos = creator.createdPosts.indexOf(args.id)

      creator.createdPosts.splice(pos, 1)
      await creator.save()

      const posts = await Post.find().populate('creator')

      return posts.map(post => transformPost(post))
    } catch (err) {
      throw new Error(err)
    }
  }
}
