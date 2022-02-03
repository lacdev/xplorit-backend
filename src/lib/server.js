/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { usersRouter } from '../routers/user.router.js'
import { routesRouter } from '../routers/route.router.js'
import { placesRouter } from '../routers/place.router.js'
import { ApiErrorHandler } from '../middlewares/api-error-handler.js'

const app = express()

//Middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

//Routers
app.use('/v1/users', usersRouter)
app.use('/v1/places', placesRouter)
app.use('/v1/routes', routesRouter)

// Health endpoint
app.get('/', (req, res) => {
  res.end('Server is up and running.')
})

//Errors Middleware
app.use(ApiErrorHandler)

export default app
