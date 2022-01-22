import { Route } from '../../models/route.model.js'

const deleteReviewFromRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteReviewFromRoute }
