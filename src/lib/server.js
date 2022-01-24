/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { UsersRouter } from '../routers/user.router.js'
import { RoutesRouter } from '../routers/route.router.js'
import { ReviewsRouter } from '../routers/review.router.js'
import { PlacesRouter } from '../routers/place.router.js'
import { LikesRouter } from '../routers/like.router.js'
import { ApiErrorHandler } from '../middlewares/api-error-handler.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

app.use('/v1/users', UsersRouter)
app.use('/v1/routes', RoutesRouter)
app.use('/v1/routes', ReviewsRouter)
app.use('/v1/places', ReviewsRouter)
app.use('/v1/places', PlacesRouter)
app.use('/v1/routes', LikesRouter)
app.use('/v1/places', LikesRouter)

// Health endpoint
app.get('/', (req, res) => {
  res.end('Server is up and running.')
})

app.use(ApiErrorHandler)

export default app
