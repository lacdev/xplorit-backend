import { Place } from '../../models/place.model.js'

const deleteSinglePlace = async (id) => {
  try {
    return await Place.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteSinglePlace }
