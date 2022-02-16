import { Review } from '../../models/review.model.js'

const getReviewsInPlaceBeforeCalculation = async (query) =>
  await Review.find(query)

export { getReviewsInPlaceBeforeCalculation }
