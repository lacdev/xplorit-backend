import { Place } from '../../models/place.model.js'

const deleteLikeFromPlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteLikeFromPlace }
