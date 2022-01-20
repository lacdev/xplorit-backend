/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { UserRouter } from '../routers/user.router.js'
import { RoutesRouter } from '../routers/route.router.js'
import { ReviewRouter } from '../routers/review.router.js'
import { PlaceRouter } from '../routers/place.router.js'
import { LikesRouter } from '../routers/like.router.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

app.use('/users', UserRouter)
app.use('/routes', RoutesRouter)
app.use('/routes', ReviewRouter)
app.use('/places', ReviewRouter)
app.use('/places', PlaceRouter)
app.use('/routes', LikesRouter)
app.use('/places', LikesRouter)

export default app
