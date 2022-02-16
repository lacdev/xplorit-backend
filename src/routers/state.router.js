import express from 'express'
import { getStates } from '../controllers/statesControllers/getStates.js'

//Pending Rate Limiter

const router = express.Router()

router.get('/', getStates)

export { router as statesRouter }
