import { Route } from '../../models/route.model.js'

const getAllReviewsFromRoute = async (id) => {
  try {
    return await Route.findById(id)
  } catch (error) {
    console.error(error)
  }
}

export { getAllReviewsFromRoute }
