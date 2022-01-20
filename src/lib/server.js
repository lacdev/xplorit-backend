/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router as userRoutes } from 'routers/user.router'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

app.use('/users', userRoutes)

export default app
