import { Place } from '../../models/place.model.js'

const getSinglePlace = async (id) => await Place.findById(id)

export { getSinglePlace }
