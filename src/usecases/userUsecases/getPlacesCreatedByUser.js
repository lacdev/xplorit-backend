import { Place } from '../../models/place.model.js'

const getPlacesCreatedByUser = async (id) => await Place.find({ ownerId: id })

export { getPlacesCreatedByUser }
