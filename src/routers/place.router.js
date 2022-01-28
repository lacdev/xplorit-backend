import express from 'express'
import { getPlaces } from '../controllers/placesControllers/getPlaces.js'
import { getPlace } from '../controllers/placesControllers/getPlace.js'
import { savePlace } from '../controllers/placesControllers/savePlace.js'
import { updatePlace } from '../controllers/placesControllers/updatePlace.js'
import { deletePlace } from '../controllers/placesControllers/deletePlace.js'
import { validatePlaceCreation } from '../validators/placesValidators/savePlaceValidation.js'

const router = express.Router()

//Places controllers
router.get('/', getPlaces)
router.get('/:placeId', getPlace)
router.post('/', savePlace)
router.patch('/:placeId', updatePlace)
router.delete('/:placeId', deletePlace)

export { router as PlacesRouter }
