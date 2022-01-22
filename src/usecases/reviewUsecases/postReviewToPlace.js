import { Place } from '../../models/place.model.js'

const postReviewToPlace = async (id, review) => await Place.findById(id, review)

export { postReviewToPlace }
