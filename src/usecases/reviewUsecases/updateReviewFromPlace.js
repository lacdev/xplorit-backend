import { Review } from '../../models/review.model.js'

const updateReviewFromPlace = async (id, body) =>
  await Review.findByIdAndUpdate(id, body, { new: true })

export { updateReviewFromPlace }
