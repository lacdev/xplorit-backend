import { Review } from '../../models/review.model.js'

const postReviewToPlace = async (review) => await Review.create(review)

export { postReviewToPlace }
