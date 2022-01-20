import * as express from 'express'
import * as placesController from 'controllers/place.controller'

const router = express.Router()

//Places controllers
router.get('/', placesController.getPlaces)
router.post('/', placesController.savePlace)
router.get('/:id', placesController.getPlace)
router.patch('/:id', placesController.updatePlace)
router.delete('/:id', placesController.deletePlace)
