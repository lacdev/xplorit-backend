import { Place } from '../../models/place.model.js'

const getSinglePlace = async (id) => {
  try {
    return await Place.findById(id)
  } catch (error) {
    console.error(error)
  }
}

export { getSinglePlace }
