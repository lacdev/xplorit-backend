import { Place } from '../../models/place.model.js'

const getAllPlaces = async () => {
  try {
    return await Place.find()
  } catch (error) {
    console.error(error)
  }
}

export { getAllPlaces }
