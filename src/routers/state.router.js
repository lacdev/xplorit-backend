import express from 'express'
import { getStates } from '../controllers/statesControllers/getStates.js'

const router = express.Router()

router.get('/', getStates)

export { router as statesRouter }
