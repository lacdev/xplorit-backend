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
import { getReviewsInPlace } from '../controllers/reviewsControllers/getReviewsInPlace.js'
import { saveReviewInPlace } from '../controllers/reviewsControllers/saveReviewInPlace.js'
import { updateReviewInPlace } from '../controllers/reviewsControllers/updateReviewInPlace.js'
import { deleteReviewInPlace } from '../controllers/reviewsControllers/deleteReviewInPlace.js'
import { validateSaveReviewInPlace } from '../validators/reviewsValidators/saveReviewInPlaceValidation.js'
import { getLikesInPlace } from '../controllers/likesControllers/getLikesInPlace.js'
import { saveLikeInPlace } from '../controllers/likesControllers/saveLikeInPlace.js'
import { deleteLikeInPlace } from '../controllers/likesControllers/deleteLikeInPlace.js'
import { validateGetReviewsFromPlace } from '../validators/reviewsValidators/getReviewsInPlaceValidation.js'
import { validateReviewUpdateInPlace } from '../validators/reviewsValidators/updateReviewInPlaceValidation.js'
// import { validateGetPlaceQuery } from '../validators/placesValidators/getPlaceQueryValidator.js'

const router = express.Router()

//Places controllers
router.get('/', getPlaces)
router.get('/:placeId', validateGetPlace, getPlace)
router.post('/', validatePlaceCreation, savePlace)
router.patch('/:placeId', validatePlaceUpdate, updatePlace)
router.delete('/:placeId', validatePlaceDeletion, deletePlace)

//Reviews in places controllers
router.get('/:placeId/reviews', validateGetReviewsFromPlace, getReviewsInPlace)
router.post('/:placeId/reviews', validateSaveReviewInPlace, saveReviewInPlace)
router.patch(
  '/:placeId/reviews/:reviewId',
  validateReviewUpdateInPlace,
  updateReviewInPlace
)
router.delete('/:placeId/reviews/:reviewId', deleteReviewInPlace)

//Likes in places controllers
router.get('/:placeId/likes', getLikesInPlace)
router.post('/:placeId/likes', saveLikeInPlace)
router.delete('/:placeId/likes/:likeId', deleteLikeInPlace)

export { router as placesRouter }
