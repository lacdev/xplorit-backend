import * as express from 'express'
import * as reviewsController from '../controllers/review.controller.js'

const router = express.Router()

//Reviews in routes controllers
router.get('/:id/reviews', reviewsController.getReviewsInRoute)
router.post('/:id/reviews', reviewsController.saveReviewInRoute)
router.patch('/:id/reviews/:id', reviewsController.updateReviewInRoute)
router.delete('/:id/reviews/:id', reviewsController.deleteReviewInRoute)

//Reviews in places controllers
router.get('/:id/reviews', reviewsController.getReviewsInPlace)
router.post('/:id/reviews', reviewsController.saveReviewInPlace)
router.patch('/:id/reviews/:id', reviewsController.updateReviewInPlace)
router.delete('/:id/reviews/:id', reviewsController.deleteReviewInPlace)

export { router as ReviewRouter }
