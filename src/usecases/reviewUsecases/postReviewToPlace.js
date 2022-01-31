import { Review } from '../../models/review.model.js'

const postReviewToPlace = async (review) => {
  try {
    return await Review.create(review)
  } catch (error) {
    console.error(error)
  }
}

export { postReviewToPlace }
