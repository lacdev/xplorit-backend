import { Review } from '../../models/review.model.js'

const postReviewToRoute = async (review) => await Review.create(review)

export { postReviewToRoute }
