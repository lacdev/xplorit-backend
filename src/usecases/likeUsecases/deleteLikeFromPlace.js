import { Like } from 'models/like.model'
import { Place } from 'models/place.model'

const deleteLikeFromPlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteLikeFromPlace }
