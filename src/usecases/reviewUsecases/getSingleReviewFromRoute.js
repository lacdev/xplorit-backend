import { Review } from '../../models/review.model.js'

const getSingleReviewFromRoute = async (id) =>
  await Review.find({ _id: id }).setOptions({ sanitizeFilter: true })

export { getSingleReviewFromRoute }
