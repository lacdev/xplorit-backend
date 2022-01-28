import express from 'express'
import { getRoutes } from '../controllers/routesControllers/getRoutes.js'
import { getRoute } from '../controllers/routesControllers/getRoute.js'
import { saveRoute } from '../controllers/routesControllers/saveRoute.js'
import { updateRoute } from '../controllers/routesControllers/updateRoute.js'
import { deleteRoute } from '../controllers/routesControllers/deleteRoute.js'
<<<<<<< HEAD
import { validateGetRoute } from '../validators/routesValidators/getRouteValidation'
=======
import { validateRouteCreation } from '../validators/routesValidators/saveRouteValidation.js'
>>>>>>> 94b0a95c4a33ce0c9119ff110045a2ff8a97a8ff

const router = express.Router()

//Routes controller
router.get('/', getRoutes)
<<<<<<< HEAD
router.get('/:routeId',  validateGetRoute, getRoute)
router.post('/', saveRoute)
=======
router.get('/:routeId', getRoute)
router.post('/', validateRouteCreation, saveRoute)
>>>>>>> 94b0a95c4a33ce0c9119ff110045a2ff8a97a8ff
router.patch('/:routeId', updateRoute)
router.delete('/:routeId', deleteRoute)

export { router as RoutesRouter }
