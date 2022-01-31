import { Review } from '../../models/review.model.js'

const postReviewToRoute = async (review) => {
  try {
    return await Review.create(review)
  } catch (error) {
    console.error(error)
  }
}

export { postReviewToRoute }
