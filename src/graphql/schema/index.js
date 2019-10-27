const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Post {
  _id: ID!
  title: String!
  image: String!
  content: String!
  createdAt: String!
  updatedAt: String!
  creator: User!
}
type User {
  _id: ID!
  username: String!
  email: String!
  password: String
  createdPosts: [Post!]
}
type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
input PostInput {
  title: String!
  image: String!
  content: String!
}
input UserInput {
  username: String!
  email: String!
  password: String!
}
type RootQuery {
  posts: [Post!]!
  post(id: ID!): Post!
  users: [User!]!
  user(id: ID!): User!
  login(email: String!, password: String!): AuthData!
}
type RootMutation {
  createPost(postInput: PostInput): Post
  editPost(postInput: PostInput, id: ID!): Post
  deletePost(id: ID!): [Post]
  singup(userInput: UserInput): User
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`)
