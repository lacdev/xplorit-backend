/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { usersRouter } from '../routers/user.router.js'
import { routesRouter } from '../routers/route.router.js'
import { placesRouter } from '../routers/place.router.js'
import { statesRouter } from '../routers/state.router.js'
import { loginRouter } from '../routers/login.router.js'
import { ApiErrorHandler } from '../middlewares/api-error-handler.js'

const app = express()

//Middlewares
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb', extended: true }))

app.use(cors())
app.use(helmet())

app.set('trust proxy', 1)

app.use(morgan('combined'))

//Routers
app.use('/v1/users', usersRouter)
app.use('/v1/places', placesRouter)
app.use('/v1/routes', routesRouter)
app.use('/v1/states', statesRouter)
app.use('/v1/login', loginRouter)

// Health endpoint
app.get('/_health', (req, res) => res.end('Server is up and running.'))

//test endpoint to get the client IP for trust proxy middleware.
app.get('/ip', (request, response) => response.send(request.ip))

//Errors Middleware
app.use(ApiErrorHandler)

export default app
