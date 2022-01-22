import { Place } from '../../models/place.model.js'

const updateReviewFromPlace = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

export { updateReviewFromPlace }
