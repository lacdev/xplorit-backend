import * as express from 'express'
import * as routesController from '../controllers/route.controller.js'

const router = express.Router()

//Routes controller
router.get('/', routesController.getRoutes)
router.get('/:id', routesController.getRoute)
router.post('/', routesController.saveRoute)
router.patch('/:id', routesController.updateRoute)
router.delete('/:id', routesController.deleteRoute)

export { router as RoutesRouter }
