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

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

app.use('/users', UsersRouter)
app.use('/routes', RoutesRouter)
app.use('/routes', ReviewsRouter)
app.use('/places', ReviewsRouter)
app.use('/places', PlacesRouter)
app.use('/routes', LikesRouter)
app.use('/places', LikesRouter)

// Health endpoint
app.get('/', (req, res) => {
  res.end('server is running')
})

export default app
