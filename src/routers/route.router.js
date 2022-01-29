import express from 'express'
import { getRoutes } from '../controllers/routesControllers/getRoutes.js'
import { getRoute } from '../controllers/routesControllers/getRoute.js'
import { saveRoute } from '../controllers/routesControllers/saveRoute.js'
import { updateRoute } from '../controllers/routesControllers/updateRoute.js'
import { deleteRoute } from '../controllers/routesControllers/deleteRoute.js'
import { validateRouteCreation } from '../validators/routesValidators/saveRouteValidation.js'

const router = express.Router()

//Routes controller
router.get('/', getRoutes)
router.get('/:routeId', getRoute)
router.post('/', validateRouteCreation, saveRoute)
router.patch('/:routeId', updateRoute)
router.delete('/:routeId', deleteRoute)

export { router as RoutesRouter }
