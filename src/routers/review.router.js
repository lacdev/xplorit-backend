import express from 'express'
import { getReviewsInRoute } from '../controllers/reviewsControllers/getReviewsInRoute.js'
import { saveReviewInRoute } from '../controllers/reviewsControllers/saveReviewInRoute.js'
import { updateReviewInRoute } from '../controllers/reviewsControllers/updateReviewInRoute.js'
import { deleteReviewInRoute } from '../controllers/reviewsControllers/deleteReviewInRoute.js'
import { getReviewsInPlace } from '../controllers/reviewsControllers/getReviewsInPlace.js'
import { saveReviewInPlace } from '../controllers/reviewsControllers/saveReviewInPlace.js'
import { updateReviewInPlace } from '../controllers/reviewsControllers/updateReviewInPlace.js'
import { deleteReviewInPlace } from '../controllers/reviewsControllers/deleteReviewInPlace.js'

const router = express.Router()

//Reviews in routes controllers
router.get('/:routeId/reviews', getReviewsInRoute)
router.post('/:routeId/reviews', saveReviewInRoute)
router.patch('/:routeId/reviews/:reviewId', updateReviewInRoute)
router.delete('/:routeId/reviews/:reviewId', deleteReviewInRoute)

//Reviews in places controllers
router.get('/:placeId/reviews', getReviewsInPlace)
router.post('/:placeId/reviews', saveReviewInPlace)
router.patch('/:placeId/reviews/:reviewId', updateReviewInPlace)
router.delete('/:placeId/reviews/:reviewId', deleteReviewInPlace)

export { router as ReviewsRouter }
