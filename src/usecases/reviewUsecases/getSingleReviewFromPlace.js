import { Review } from '../../models/review.model.js'

const getSingleReviewFromPlace = async (id) =>
  await Review.find({ _id: id }).setOptions({ sanitizeFilter: true })

export { getSingleReviewFromPlace }
