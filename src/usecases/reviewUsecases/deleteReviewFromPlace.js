import { Review } from '../../models/review.model.js'

const deleteReviewFromPlace = async (id) => await Review.findByIdAndDelete(id)

export { deleteReviewFromPlace }
