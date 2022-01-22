import Route from 'models/route.model'
import Review from 'models/review.model'

const getAllReviewsFromRoute = async (id) => await Route.findById(id)

export { getAllReviewsFromRoute }
