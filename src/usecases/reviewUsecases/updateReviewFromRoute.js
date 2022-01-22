import Route from 'models/route.model'
import Review from 'models/review.model'

const updateReviewFromRoute = async (id, body) =>
  await Route.findByIdAndUpdate(id, body)

export { updateReviewFromRoute }
