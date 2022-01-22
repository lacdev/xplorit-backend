import { Place } from '../../models/place.model.js'

const getAllReviewsFromPlace = async (id) => await Place.findById(id)

export { getAllReviewsFromPlace }
