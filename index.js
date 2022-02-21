import app from './src/lib/server.js'
import dbConnect from './src/lib/db.js'
import { variables } from './src/config/config.js'

const port = variables.PORT || 8080

dbConnect(variables)
  .then(() => {
    console.log('DB Connected')
    app.listen(port, () => {
      console.log(`Server is up and listening on port ${port}`)
    })
  })
  .catch((error) => console.log(error))
