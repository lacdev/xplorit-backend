import { Route } from '../../models/route.model.js'

const updateReviewFromRoute = async (id, body) =>
  await Route.findByIdAndUpdate(id, body)

export { updateReviewFromRoute }
