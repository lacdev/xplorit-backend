import express from 'express'
import multer from 'multer'

//Places crud imports
import { getPlaces } from '../controllers/placesControllers/getPlaces.js'
import { getPlace } from '../controllers/placesControllers/getPlace.js'
import { savePlace } from '../controllers/placesControllers/savePlace.js'
import { updatePlace } from '../controllers/placesControllers/updatePlace.js'
// import { deletePlace } from '../controllers/placesControllers/deletePlace.js'

//Place crud validations imports.
import { validatePlaceCreation } from '../validators/placesValidators/savePlaceValidation.js'
import { validateGetPlace } from '../validators/placesValidators/getPlaceValidation.js'
import { validatePlaceUpdate } from '../validators/placesValidators/updatePlaceValidation.js'
import { validatePlaceImages } from '../validators/placesValidators/placeImagesValidation.js'
// import { validatePlaceDeletion } from '../validators/placesValidators/deletePlaceValidation.js'

//Reviews crud imports.
import { getReviewsInPlace } from '../controllers/reviewsControllers/getReviewsInPlace.js'
import { saveReviewInPlace } from '../controllers/reviewsControllers/saveReviewInPlace.js'
import { updateReviewInPlace } from '../controllers/reviewsControllers/updateReviewInPlace.js'
import { deleteReviewInPlace } from '../controllers/reviewsControllers/deleteReviewInPlace.js'

//Reviews validation imports.
import { validateSaveReviewInPlace } from '../validators/reviewsValidators/saveReviewInPlaceValidation.js'
import { validateGetReviewsFromPlace } from '../validators/reviewsValidators/getReviewsInPlaceValidation.js'
import { validateReviewUpdateInPlace } from '../validators/reviewsValidators/updateReviewInPlaceValidation.js'
import { validateReviewDeleteInPlace } from '../validators/reviewsValidators/deleteReviewInPlaceValidation.js'

//Likes crud imports
import { getLikesInPlace } from '../controllers/likesControllers/getLikesInPlace.js'
import { saveLikeInPlace } from '../controllers/likesControllers/saveLikeInPlace.js'
import { deleteLikeInPlace } from '../controllers/likesControllers/deleteLikeInPlace.js'

//Likes crud validations
import { getLikesFromPlaceValidation } from '../validators/likesValidators/getLikesInPlaceValidation.js'
import { validateLikeInPlace } from '../validators/likesValidators/saveLikeInPlaceValidation.js'
import { validateLikeDeletionInPlace } from '../validators/likesValidators/deleteLikeInPlaceValidation.js'

//Rate Limiter imports
// import { postReviewLimiter } from '../middlewares/rate-limiter.js'
// import { updateReviewLimiter } from '../middlewares/rate-limiter.js'
// import { getReviewsLimiter } from '../middlewares/rate-limiter.js'
// import { postLikeLimiter } from '../middlewares/rate-limiter.js'
// import { deleteLikeLimiter } from '../middlewares/rate-limiter.js'
// import { getLikesLimiter } from '../middlewares/rate-limiter.js'
// import { postPlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'
// import { getPlacesOrRoutesLimiter } from '../middlewares/rate-limiter.js'
// import { getPlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'
// import { updatePlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'

//Authentication import
import { verifyToken } from '../middlewares/authentication.js'

const router = express.Router()

const maxSize = 2 * 1024 * 1024 //2mb limit size on place images.

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
})

//Places controllers

router.get('/', getPlaces)
// getPlacesOrRoutesLimiter,
router.get('/:placeId', validateGetPlace, getPlace)
// getPlaceOrRouteLimiter,
router.post(
  '/',
  // postPlaceOrRouteLimiter,
  verifyToken,
  upload.array('images', 6),
  validatePlaceImages,
  validatePlaceCreation,
  savePlace
)

router.patch(
  '/:placeId',
  // updatePlaceOrRouteLimiter,
  verifyToken,
  validatePlaceUpdate,
  updatePlace
)

//Pending authentication middleware //Not to be used for now.

// router.delete('/:placeId', validatePlaceDeletion, deletePlace)

//Reviews in places controllers

router.get(
  '/:placeId/reviews',
  // getReviewsLimiter,
  validateGetReviewsFromPlace,
  getReviewsInPlace
)

//Pending authentication middleware

router.post(
  '/:placeId/reviews',
  // postReviewLimiter,
  verifyToken,
  validateSaveReviewInPlace,
  saveReviewInPlace
)

//Pending authentication middleware

router.patch(
  '/:placeId/reviews/:reviewId',
  // updateReviewLimiter,
  verifyToken,
  validateReviewUpdateInPlace,
  updateReviewInPlace
)

//Pending authentication middleware

router.delete(
  '/:placeId/reviews/:reviewId',
  validateReviewDeleteInPlace,
  deleteReviewInPlace
)

//Likes in places controllers

router.get(
  '/:placeId/likes',
  // getLikesLimiter,
  getLikesFromPlaceValidation,
  getLikesInPlace
)

router.post(
  '/:placeId/likes',
  // postLikeLimiter,
  verifyToken,
  validateLikeInPlace,
  saveLikeInPlace
)

router.delete(
  '/:placeId/likes/',
  // deleteLikeLimiter,
  verifyToken,
  validateLikeDeletionInPlace,
  deleteLikeInPlace
)

export { router as placesRouter }
