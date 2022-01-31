import express from 'express'
import { getPlaces } from '../controllers/placesControllers/getPlaces.js'
import { getPlace } from '../controllers/placesControllers/getPlace.js'
import { savePlace } from '../controllers/placesControllers/savePlace.js'
import { updatePlace } from '../controllers/placesControllers/updatePlace.js'
import { deletePlace } from '../controllers/placesControllers/deletePlace.js'
import { validatePlaceCreation } from '../validators/placesValidators/savePlaceValidation.js'
import { validateGetPlace } from '../validators/placesValidators/getPlaceValidation.js'
import { validatePlaceDeletion } from '../validators/placesValidators/deletePlaceValidation.js'
import { validatePlaceUpdate } from '../validators/placesValidators/updatePlaceValidation.js'
// import { validateGetPlaceQuery } from '../validators/placesValidators/getPlaceQueryValidator.js'

const router = express.Router()

//Places controllers
router.get('/', getPlaces)
router.get('/:placeId', validateGetPlace, getPlace)
router.post('/', validatePlaceCreation, savePlace)
router.patch('/:placeId', validatePlaceUpdate, updatePlace)
router.delete('/:placeId', validatePlaceDeletion, deletePlace)

export { router as PlacesRouter }
