import { Place } from '../../models/place.model.js'

const deleteReviewFromPlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteReviewFromPlace }
