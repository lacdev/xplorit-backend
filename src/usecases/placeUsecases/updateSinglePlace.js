const updateSinglePlace = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

export { updateSinglePlace }
