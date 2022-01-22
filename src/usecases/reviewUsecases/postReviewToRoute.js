import Route from 'models/route.model'
import Review from 'models/review.model'

const postReviewToRoute = async (id, review) => await Route.findById(id, review)

export { postReviewToRoute }
