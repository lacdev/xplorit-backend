import { Place } from '../../models/place.model.js'

const deleteReviewFromPlace = async (id) => {
  try {
    return await Place.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteReviewFromPlace }
