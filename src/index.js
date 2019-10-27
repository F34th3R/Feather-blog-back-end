require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')

async function main() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    })
    .then(() => {
      app.listen(app.get('port'))
      console.log(
        `Server started on port ${app.get('port')} and connected to ${
          process.env.MONGO_DB
        } database.`
      )
    })
    .catch(error => console.error(`Error: ${error}`))
}

main()
