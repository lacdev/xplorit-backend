import { Place } from '../../models/place.model.js'

const createSinglePlace = async (place) => {
  try {
    return await Place.create(place)
  } catch (error) {
    console.error(error)
  }
}

export { createSinglePlace }
