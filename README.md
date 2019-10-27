# Feather-blog back-end

This is my back-end of my personal blog 🖤. 

## Getting Started


### Prerequisites

- Node Js

### Setup


#### Step 00 - install
```
npm i
```

#### Step 01  - config .env
```
#
SECRET_KEY=
PORT=
# MONGO
MONGO_URI="local mongodb"
MONGO_USER=
MONGO_PASSWORD=
MONGO_DB=
# Token
TOKEN_KEY=
```

#### Step 02 - run the server
```
npm run dev
```

### Graphql Shema 
```
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
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Jafet** - *Initial work* - [F34th3R](https://github.com/F34th3R)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
