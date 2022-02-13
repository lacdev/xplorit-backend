import { Review } from '../../models/review.model.js'

const getSingleReviewFromRoute = async (id) => await Review.findOne({ _id: id })

export { getSingleReviewFromRoute }
