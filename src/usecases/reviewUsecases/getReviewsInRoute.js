import { Review } from '../../models/review.model.js'

const getReviewsInRouteBeforeCalculation = async (query) =>
  await Review.find(query)

export { getReviewsInRouteBeforeCalculation }
