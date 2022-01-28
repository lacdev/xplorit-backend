import { Place } from '../../models/place.model.js'

const getAllReviewsFromPlace = async (id) => {
  try {
    return await Place.findById(id)
  } catch (error) {
    console.error(error)
  }
}

export { getAllReviewsFromPlace }
