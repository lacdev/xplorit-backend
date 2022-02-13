import { getStates } from '../controllers/statesControllers/getStates.js'
import express from 'express'

const router = express.Router()

router.get('/', getStates)

export { router as statesRouter }
