/* eslint-disable no-undef */
require('dotenv').config()

const dbConnect = require('./src/lib/db')
const app = require('./src/lib/server')

dbConnect(process.env)
  .then(() => {
    console.log('DB Connected')
    app.listen(process.env.PORT, () => {
      console.log(`Server is up and running`)
    })
  })
  .catch((error) => console.log(error))

app.get('/test', (req, res) =>
  res.send('Hello from the server. This is a test and should be ignored.')
)