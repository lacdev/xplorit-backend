/* eslint-disable no-undef */
import dotenv from 'dotenv'
import app from './src/lib/server.js'
import dbConnect from './src/lib/db.js'

dotenv.config()

const port = process.env.PORT || 8080 || 9090

dbConnect(process.env)
  .then(() => {
    console.log('DB Connected')
    app.listen(port, () => {
      console.log(`Server is up and listening on port ${port}`)
    })
  })
  .catch((error) => console.log(error))
