import { Review } from '../../models/review.model.js'

const getSingleReviewFromPlace = async (id) => await Review.findOne({ _id: id })

export { getSingleReviewFromPlace }
