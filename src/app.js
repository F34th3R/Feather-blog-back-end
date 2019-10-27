const express = require('express')
const cors = require('cors')
const { authMiddleware } = require('./middleware/authMiddleware')
const graphqlHttp = require('express-graphql')

// fth init
const app = express()

// fth settings
app.set('port', process.env.PORT || 4000)

// fth middlewares
app.use(cors())
app.use(authMiddleware)
app.use(express.json())
app.use(
  '/graphql',
  graphqlHttp({
    schema: require('./graphql/schema'),
    rootValue: require('./graphql/resolvers'),
    graphiql: true
  })
)

module.exports = app
