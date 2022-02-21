import express from 'express'
import multer from 'multer'

import { getRoutes } from '../controllers/routesControllers/getRoutes.js'
import { getRoute } from '../controllers/routesControllers/getRoute.js'
import { saveRoute } from '../controllers/routesControllers/saveRoute.js'
import { updateRoute } from '../controllers/routesControllers/updateRoute.js'
import { deleteRoute } from '../controllers/routesControllers/deleteRoute.js'
import { validateRouteCreation } from '../validators/routesValidators/saveRouteValidation.js'
import { validateRouteUpdate } from '../validators/routesValidators/updateRouteValidation.js'
import { validateGetRoute } from '../validators/routesValidators/getRouteValidation.js'
import { validateRouteDeletion } from '../validators/routesValidators/deleteRouteValidation.js'
import { getReviewsInRoute } from '../controllers/reviewsControllers/getReviewsInRoute.js'
import { saveReviewInRoute } from '../controllers/reviewsControllers/saveReviewInRoute.js'
import { updateReviewInRoute } from '../controllers/reviewsControllers/updateReviewInRoute.js'
import { deleteReviewInRoute } from '../controllers/reviewsControllers/deleteReviewInRoute.js'
import { validateSaveReviewInRoute } from '../validators/reviewsValidators/saveReviewInRouteValidation.js'
import { getLikesInRoute } from '../controllers/likesControllers/getLikesInRoute.js'
import { saveLikeInRoute } from '../controllers/likesControllers/saveLikeInRoute.js'
import { deleteLikeInRoute } from '../controllers/likesControllers/deleteLikeInRoute.js'
import { validateGetReviewsFromRoute } from '../validators/reviewsValidators/getReviewsInRouteValidation.js'
import { validateReviewUpdateInRoute } from '../validators/reviewsValidators/updateReviewInRouteValidation.js'
import { validateReviewDeleteInRoute } from '../validators/reviewsValidators/deleteReviewInRouteValidation.js'
import { getLikesFromRouteValidation } from '../validators/likesValidators/getLikesInRouteValidation.js'
import { validateLikeInRoute } from '../validators/likesValidators/saveLikeInRouteValidation.js'
import { validateLikeDeletionInRoute } from '../validators/likesValidators/deleteLikeInRouteValidation.js'
import { validateRouteImages } from '../validators/routesValidators/routeImagesValidation.js'
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
import { verifyToken } from '../middlewares/authentication.js'
// import { validateGetRouteQuery } from '../validators/routesValidators/getRouteQueryValidator.js'

//Pending Rate Limiter

const router = express.Router()

const maxSize = 2 * 1024 * 1024

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

//Pending authentication middleware

router.delete('/:routeId', validateRouteDeletion, deleteRoute)

//Reviews in Routes Controllers
router.get(
  '/:routeId/reviews',
  getReviewsLimiter,
  validateGetReviewsFromRoute,
  getReviewsInRoute
)

//Pending authentication middleware

router.post(
  '/:routeId/reviews',
  postReviewLimiter,
  validateSaveReviewInRoute,
  saveReviewInRoute
)

//Pending authentication middleware

router.patch(
  '/:routeId/reviews/:reviewId',
  updateReviewLimiter,
  validateReviewUpdateInRoute,
  updateReviewInRoute
)

//Pending authentication middleware

router.delete(
  '/:routeId/reviews/:reviewId',
  validateReviewDeleteInRoute,
  deleteReviewInRoute
)

//Likes in routes controllers
router.get(
  '/:routeId/likes',
  getLikesLimiter,
  getLikesFromRouteValidation,
  getLikesInRoute
)

//Pending authentication middleware

router.post(
  '/:routeId/likes',
  postLikeLimiter,
  validateLikeInRoute,
  saveLikeInRoute
)

//Pending authentication middleware

router.delete(
  '/:routeId/likes/',
  deleteLikeLimiter,
  validateLikeDeletionInRoute,
  deleteLikeInRoute
)

//To be deprecated?

// router.delete(
//   '/:routeId/likes/:likeId',
//   validateLikeDeletionInRoute,
//   deleteLikeInRoute
// )

export { router as routesRouter }
