import { Review } from '../../models/review.model.js'

const getAllReviewsFromPlace = async (id) => {
  try {
    return await Review.find(id)
  } catch (error) {
    console.error(error)
  }
}

export { getAllReviewsFromPlace }
