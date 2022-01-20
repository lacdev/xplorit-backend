import * as express from 'express'
import * as reviewsController from 'controllers/review.controller'

const router = express.Router()

//Reviews in routes controllers
router.get('routes/:id/reviews', reviewsController.getReviewsInRoute)
router.post('routes/:id/reviews', reviewsController.saveReviewInRoute)
router.patch('routes/:id/reviews/:id', reviewsController.updateReviewInRoute)
router.delete('routes/:id/reviews/:id', reviewsController.deleteReviewInRoute)

//Reviews in places controllers
router.get('places/:id/reviews', reviewsController.getReviewsInPlace)
router.post('places/:id/reviews', reviewsController.saveReviewInPlace)
router.patch('places/:id/reviews/:id', reviewsController.updateReviewInPlace)
router.delete('places/:id/reviews/:id', reviewsController.deleteReviewInPlace)

export default router
