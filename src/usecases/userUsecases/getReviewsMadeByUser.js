import { Review } from '../../models/review.model.js'

const getReviewsMadeByUser = async (id) => {
  try {
    return await Review.find({ ownerId: id })
  } catch (error) {
    console.error(error)
  }
}

export { getReviewsMadeByUser }
