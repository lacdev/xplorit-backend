import Route from 'models/route.model'
import Review from 'models/review.model'

const deleteReviewFromRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteReviewFromRoute }
