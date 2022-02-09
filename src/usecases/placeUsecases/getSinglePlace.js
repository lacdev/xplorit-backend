import { Place } from '../../models/place.model.js'

const getSinglePlace = async (id) =>
  await Place.find({ _id: id }).setOptions({ sanitizeFilter: true })

export { getSinglePlace }
