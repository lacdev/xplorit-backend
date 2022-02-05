import { Review } from '../../models/review.model.js'

const getReviewsMadeByUser = async (id) => {
  try {
    return await Review.find({ userId: id })
  } catch (error) {
    console.error(error)
  }
}

export { getReviewsMadeByUser }
