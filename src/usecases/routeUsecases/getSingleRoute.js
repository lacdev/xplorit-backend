import { Route } from '../../models/route.model.js'

const getSingleRoute = async (id) => await Route.findOne({ _id: id })

export { getSingleRoute }
