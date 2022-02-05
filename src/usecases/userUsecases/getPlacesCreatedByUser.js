import { Place } from '../../models/place.model.js'

const getPlacesCreatedByUser = async (id) => {
  try {
    return await Place.find({ ownerId: id })
  } catch (error) {
    console.error(error)
  }
}

export { getPlacesCreatedByUser }
