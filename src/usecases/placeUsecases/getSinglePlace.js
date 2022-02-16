import { Place } from '../../models/place.model.js'

const getSinglePlace = async (query) => await Place.findOne(query)

export { getSinglePlace }
