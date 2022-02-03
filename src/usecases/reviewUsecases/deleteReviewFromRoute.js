import { Review } from '../../models/review.model.js'

const deleteReviewFromRoute = async (id) => {
  try {
    return await Review.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteReviewFromRoute }
