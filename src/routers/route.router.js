import express from 'express'
import { getRoutes } from '../controllers/routesControllers/getRoutes.js'
import { getRoute } from '../controllers/routesControllers/getRoute.js'
import { saveRoute } from '../controllers/routesControllers/saveRoute.js'
import { updateRoute } from '../controllers/routesControllers/updateRoute.js'
import { deleteRoute } from '../controllers/routesControllers/deleteRoute.js'
import { validateRouteCreation } from '../validators/routesValidators/saveRouteValidation.js'
import { validateRouteUpdate } from '../validators/routesValidators/updateRouteValidation.js'
import { validateGetRoute } from '../validators/routesValidators/getRouteValidation.js'
import { validateRouteDeletion } from '../validators/routesValidators/deleteRouteValidation.js'
// import { validateGetRouteQuery } from '../validators/routesValidators/getRouteQueryValidator.js'

const router = express.Router()

//Routes controller
router.get('/', getRoutes)
router.get('/:routeId', validateGetRoute, getRoute)
router.post('/', validateRouteCreation, saveRoute)
router.patch('/:routeId', validateRouteUpdate, updateRoute)
router.delete('/:routeId', validateRouteDeletion, deleteRoute)

export { router as RoutesRouter }
