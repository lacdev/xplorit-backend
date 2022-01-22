import { Route } from '../../models/route.model.js'

const getAllReviewsFromRoute = async (id) => await Route.findById(id)

export { getAllReviewsFromRoute }
