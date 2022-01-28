import { Place } from '../../models/place.model.js'

const updateReviewFromPlace = async (id, body) => {
  try {
    return await Place.findByIdAndUpdate(id, body)
  } catch (error) {
    console.error(error)
  }
}

export { updateReviewFromPlace }
