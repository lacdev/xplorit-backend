import { Route } from '../../models/route.model.js'

const updateReviewFromRoute = async (id, body) => {
  try {
    return await Route.findByIdAndUpdate(id, body)
  } catch (error) {
    console.error(error)
  }
}

export { updateReviewFromRoute }
