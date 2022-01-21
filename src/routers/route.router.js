import express from 'express'
import * as routesController from '../controllers/route.controller.js'

const router = express.Router()

//Routes controller
router.get('/', routesController.getRoutes)
router.get('/:routeId', routesController.getRoute)
router.post('/', routesController.saveRoute)
router.patch('/:routeId', routesController.updateRoute)
router.delete('/:routeId', routesController.deleteRoute)

export { router as RoutesRouter }
