import { Place } from '../../models/place.model.js'
// import { ApiError } from '../../errors/ApiError.js'

const deleteLikeFromPlace = async (id) => {
  try {
    return await Place.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteLikeFromPlace }
