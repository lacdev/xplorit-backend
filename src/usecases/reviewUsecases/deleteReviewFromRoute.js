import { Route } from '../../models/route.model.js'

const deleteReviewFromRoute = async (id) => {
  try {
    return await Route.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteReviewFromRoute }
