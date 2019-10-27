const User = require('../models/user')
const Post = require('../models/post')

const { dateToString } = require('./date')

const posts = async postIds => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } })
    return posts.map(post => transformPost(post))
  } catch (error) {}
}

const user = async userId => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      _id: user.id,
      createdPosts: posts.bind(this, user._doc.createdPosts)
    }
  } catch (err) {}
}

const transformPost = post => {
  return {
    ...post._doc,
    _id: post.id,
    creator: user.bind(this, post.creator),
    createdAt: dateToString(post._doc.createdAt),
    updatedAt: dateToString(post._doc.updatedAt)
  }
}

exports.transformPost = transformPost
exports.user = user
