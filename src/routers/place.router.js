import * as express from 'express'
import * as placesController from '../controllers/place.controller.js'

const router = express.Router()

//Places controllers
router.get('/', placesController.getPlaces)
router.get('/:id', placesController.getPlace)
router.post('/', placesController.savePlace)
router.patch('/:id', placesController.updatePlace)
router.delete('/:id', placesController.deletePlace)

export { router as PlaceRouter }
