import { Route } from '../../models/route.model.js'

const postReviewToRoute = async (id, review) => {
  try {
    return await Route.findById(id, review)
  } catch (error) {
    console.error(error)
  }
}

export { postReviewToRoute }
