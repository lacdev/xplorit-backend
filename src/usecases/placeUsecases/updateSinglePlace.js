import Place from 'models/place.model'

const updateSinglePlace = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

export { updateSinglePlace }
