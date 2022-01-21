import express from 'express'
import * as reviewsController from '../controllers/review.controller.js'

const router = express.Router()

//Reviews in routes controllers
router.get('/:routeId/reviews', reviewsController.getReviewsInRoute)
router.post('/:routeId/reviews', reviewsController.saveReviewInRoute)
router.patch(
  '/:routeId/reviews/:reviewId',
  reviewsController.updateReviewInRoute
)
router.delete(
  '/:routeId/reviews/:reviewId',
  reviewsController.deleteReviewInRoute
)

//Reviews in places controllers
router.get('/:placeId/reviews', reviewsController.getReviewsInPlace)
router.post('/:placeId/reviews', reviewsController.saveReviewInPlace)
router.patch(
  '/:placeId/reviews/:reviewId',
  reviewsController.updateReviewInPlace
)
router.delete(
  '/:placeId/reviews/:reviewId',
  reviewsController.deleteReviewInPlace
)

export { router as ReviewsRouter }
