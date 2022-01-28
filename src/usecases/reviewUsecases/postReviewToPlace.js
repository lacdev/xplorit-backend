import { Place } from '../../models/place.model.js'

const postReviewToPlace = async (id, review) => {
  try {
    return await Place.findById(id, review)
  } catch (error) {
    console.error(error)
  }
}

export { postReviewToPlace }
