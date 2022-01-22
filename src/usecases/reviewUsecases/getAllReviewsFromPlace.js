import { Review } from 'models/review.model'
import { Place } from 'models/place.model'

const getAllReviewsFromPlace = async (id) => await Place.findById(id)

export { getAllReviewsFromPlace }
