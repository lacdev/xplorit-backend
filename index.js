/* eslint-disable no-undef */
import dotenv from 'dotenv'
import app from './src/lib/server.js'
import dbConnect from './src/lib/db.js'

dotenv.config()

dbConnect(process.env)
  .then(() => {
    console.log('DB Connected')
    app.listen(process.env.PORT, () => {
      console.log(`Server is up and running`)
    })
  })
  .catch((error) => console.log(error))
