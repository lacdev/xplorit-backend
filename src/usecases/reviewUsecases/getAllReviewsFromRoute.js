import { Review } from '../../models/review.model.js'

const getAllReviewsFromRoute = async (id) => {
  try {
    return await Review.find(id)
  } catch (error) {
    console.error(error)
  }
}

export { getAllReviewsFromRoute }
