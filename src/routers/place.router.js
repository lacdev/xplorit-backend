import express from 'express'
import * as placesController from '../controllers/place.controller.js'

const router = express.Router()

//Places controllers
router.get('/', placesController.getPlaces)
router.get('/:placeId', placesController.getPlace)
router.post('/', placesController.savePlace)
router.patch('/:placeId', placesController.updatePlace)
router.delete('/:placeId', placesController.deletePlace)

export { router as PlacesRouter }
