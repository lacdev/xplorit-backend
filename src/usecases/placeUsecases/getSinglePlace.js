import { Place } from '../../models/place.model.js'

const getSinglePlace = async (id) => {
    return await Place.find({ _id: id })
    .select('name _id address city ownerId')
    .setOptions({ sanitizeFilter: true })
}

export { getSinglePlace }
