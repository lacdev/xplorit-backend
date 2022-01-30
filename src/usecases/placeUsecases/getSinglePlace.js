import { Place } from '../../models/place.model.js'

const getSinglePlace = async (id) => {

  try {
    
    return await Place.find({_id: id})
    .select('_id name ')

  } catch (error) {
    console.error(error)
  }
}

export { getSinglePlace }
