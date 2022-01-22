import { Review } from 'models/review.model'
import { Place } from 'models/place.model'

const postReviewToPlace = async (id, review) => await Place.findById(id, review)

export { postReviewToPlace }
