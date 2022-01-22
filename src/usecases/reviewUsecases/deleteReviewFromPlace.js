import { Review } from 'models/review.model'
import { Place } from 'models/place.model'

const deleteReviewFromPlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteReviewFromPlace }
