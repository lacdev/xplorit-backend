import express from 'express'
import multer from 'multer'

//Routes crud imports.
import { getRoutes } from '../controllers/routesControllers/getRoutes.js'
import { getRoute } from '../controllers/routesControllers/getRoute.js'
import { saveRoute } from '../controllers/routesControllers/saveRoute.js'
import { updateRoute } from '../controllers/routesControllers/updateRoute.js'
// import { deleteRoute } from '../controllers/routesControllers/deleteRoute.js'

//Routes crud validation imports.
import { validateRouteCreation } from '../validators/routesValidators/saveRouteValidation.js'
import { validateRouteUpdate } from '../validators/routesValidators/updateRouteValidation.js'
import { validateGetRoute } from '../validators/routesValidators/getRouteValidation.js'
import { validateRouteImages } from '../validators/routesValidators/routeImagesValidation.js'
// import { validateRouteDeletion } from '../validators/routesValidators/deleteRouteValidation.js'

//Reviews in route crud imports.
import { getReviewsInRoute } from '../controllers/reviewsControllers/getReviewsInRoute.js'
import { saveReviewInRoute } from '../controllers/reviewsControllers/saveReviewInRoute.js'
import { updateReviewInRoute } from '../controllers/reviewsControllers/updateReviewInRoute.js'
// import { deleteReviewInRoute } from '../controllers/reviewsControllers/deleteReviewInRoute.js'

//Reviews crud validation imports.
import { validateGetReviewsFromRoute } from '../validators/reviewsValidators/getReviewsInRouteValidation.js'
import { validateSaveReviewInRoute } from '../validators/reviewsValidators/saveReviewInRouteValidation.js'
import { validateReviewUpdateInRoute } from '../validators/reviewsValidators/updateReviewInRouteValidation.js'
// import { validateReviewDeleteInRoute } from '../validators/reviewsValidators/deleteReviewInRouteValidation.js'

//Likes in routes crud imports.
import { getLikesInRoute } from '../controllers/likesControllers/getLikesInRoute.js'
import { saveLikeInRoute } from '../controllers/likesControllers/saveLikeInRoute.js'
import { deleteLikeInRoute } from '../controllers/likesControllers/deleteLikeInRoute.js'

//Likes in routes validation imports.
import { getLikesFromRouteValidation } from '../validators/likesValidators/getLikesInRouteValidation.js'
import { validateLikeInRoute } from '../validators/likesValidators/saveLikeInRouteValidation.js'
import { validateLikeDeletionInRoute } from '../validators/likesValidators/deleteLikeInRouteValidation.js'

//Rate limiter Imports.
import { postReviewLimiter } from '../middlewares/rate-limiter.js'
import { updateReviewLimiter } from '../middlewares/rate-limiter.js'
import { getReviewsLimiter } from '../middlewares/rate-limiter.js'
import { postLikeLimiter } from '../middlewares/rate-limiter.js'
import { deleteLikeLimiter } from '../middlewares/rate-limiter.js'
import { getLikesLimiter } from '../middlewares/rate-limiter.js'
import { postPlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'
import { getPlacesOrRoutesLimiter } from '../middlewares/rate-limiter.js'
import { getPlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'
import { updatePlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'

//Authentication imports.
import { verifyToken } from '../middlewares/authentication.js'

const router = express.Router()

const maxSize = 2 * 1024 * 1024 //2mb max size on routes images.

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
})

//Routes controller

router.get('/', getPlacesOrRoutesLimiter, getRoutes)

router.get('/:routeId', getPlaceOrRouteLimiter, validateGetRoute, getRoute)

router.post(
  '/',
  postPlaceOrRouteLimiter,
  verifyToken,
  upload.array('images', 6),
  validateRouteImages,
  validateRouteCreation,
  saveRoute
)

router.patch(
  '/:routeId',
  updatePlaceOrRouteLimiter,
  verifyToken,
  validateRouteUpdate,
  updateRoute
)

//Pending authentication middleware //To be deprecated ?

// router.delete('/:routeId', validateRouteDeletion, deleteRoute)

//Reviews in Routes Controllers

router.get(
  '/:routeId/reviews',
  getReviewsLimiter,
  validateGetReviewsFromRoute,
  getReviewsInRoute
)

router.post(
  '/:routeId/reviews',
  postReviewLimiter,
  verifyToken,
  validateSaveReviewInRoute,
  saveReviewInRoute
)

router.patch(
  '/:routeId/reviews/:reviewId',
  updateReviewLimiter,
  verifyToken,
  validateReviewUpdateInRoute,
  updateReviewInRoute
)

// router.delete(
//   '/:routeId/reviews/:reviewId',
//   validateReviewDeleteInRoute,
//   deleteReviewInRoute
// )

//Likes in routes controllers

router.get(
  '/:routeId/likes',
  getLikesLimiter,
  getLikesFromRouteValidation,
  getLikesInRoute
)

router.post(
  '/:routeId/likes',
  postLikeLimiter,
  verifyToken,
  validateLikeInRoute,
  saveLikeInRoute
)

router.delete(
  '/:routeId/likes/',
  deleteLikeLimiter,
  verifyToken,
  validateLikeDeletionInRoute,
  deleteLikeInRoute
)

export { router as routesRouter }
