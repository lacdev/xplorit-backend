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
// import { validateGetRouteQuery } from '../validators/routesValidators/getRouteQueryValidator.js'

const router = express.Router()

const maxSize = 2 * 1024 * 1024

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
})

//Routes controller
router.get('/', getRoutes)
router.get('/:routeId', validateGetRoute, getRoute)
router.post(
  '/',
  upload.array('images', 6),
  validateRouteImages,
  validateRouteCreation,
  saveRoute
)
router.patch('/:routeId', validateRouteUpdate, updateRoute)
router.delete('/:routeId', validateRouteDeletion, deleteRoute)

//Reviews in Routes Controllers
router.get('/:routeId/reviews', validateGetReviewsFromRoute, getReviewsInRoute)
router.post('/:routeId/reviews', validateSaveReviewInRoute, saveReviewInRoute)
router.patch(
  '/:routeId/reviews/:reviewId',
  validateReviewUpdateInRoute,
  updateReviewInRoute
)
router.delete(
  '/:routeId/reviews/:reviewId',
  validateReviewDeleteInRoute,
  deleteReviewInRoute
)

//Likes in routes controllers
router.get('/:routeId/likes', getLikesFromRouteValidation, getLikesInRoute)
router.post('/:routeId/likes', validateLikeInRoute, saveLikeInRoute)
router.delete(
  '/:routeId/likes/:likeId',
  validateLikeDeletionInRoute,
  deleteLikeInRoute
)

export { router as routesRouter }
