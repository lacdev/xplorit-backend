import { Review } from '../../models/review.model.js'

const updateReviewFromRoute = async (id, body) => {
  try {
    return await Review.findByIdAndUpdate(id, body)
  } catch (error) {
    console.error(error)
  }
}

export { updateReviewFromRoute }
