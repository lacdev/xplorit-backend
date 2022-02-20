import { Place } from '../../models/place.model.js'

const getSinglePlace = async (query) =>
  await Place.findOne(query).populate({
    path: 'ownerId',
    select: 'username avatar',
  })

export { getSinglePlace }
