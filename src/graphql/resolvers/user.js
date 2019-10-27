const User = require('../../models/user')

const { user } = require('../../helpers/merge')
const { tokenVerify } = require('../../middleware/authMiddleware')

module.exports = {
  // get users
  users: async (args, req) => {
    tokenVerify(req)
    const users = await User.find(args.id)
    return users.map(data => user(data))
  },
  // get single user
  user: async (args, req) => {
    tokenVerify(req)
    const data = await User.findById(args.id)
    return user(data)
  }
}
