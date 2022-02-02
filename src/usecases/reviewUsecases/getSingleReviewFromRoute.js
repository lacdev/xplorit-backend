import { Review } from '../../models/review.model.js'

const getSingleReviewFromRoute = async (id) => {
  try {
    return await Review.find({ _id: id }).setOptions({ sanitizeFilter: true })
  } catch (error) {
    console.error(error)
  }
}

export { getSingleReviewFromRoute }
