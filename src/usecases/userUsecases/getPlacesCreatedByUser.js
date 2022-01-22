import { User } from 'models/user.model'
import { Place } from 'models/place.model'

const getPlacesCreatedByUser = async (id) => await User.findById(id)

export { getPlacesCreatedByUser }
