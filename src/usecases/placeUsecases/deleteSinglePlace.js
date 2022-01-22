import { Place } from '../../models/place.model.js'

const deleteSinglePlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteSinglePlace }
