import { Place } from '../../models/place.model.js'

const getSinglePlace = async (id) => await Place.findOne({ _id: id })

export { getSinglePlace }
