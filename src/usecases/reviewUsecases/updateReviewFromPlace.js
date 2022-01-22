import { Review } from 'models/review.model'
import { Place } from 'models/place.model'

const updateReviewFromPlace = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

export { updateReviewFromPlace }
