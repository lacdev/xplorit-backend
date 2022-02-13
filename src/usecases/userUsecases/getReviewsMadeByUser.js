import { Review } from '../../models/review.model.js'

const getReviewsMadeByUser = async (id) => await Review.find({ userId: id })

export { getReviewsMadeByUser }
