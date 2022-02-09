import { Review } from '../../models/review.model.js'

const deleteReviewFromRoute = async (id) => await Review.findByIdAndDelete(id)

export { deleteReviewFromRoute }
