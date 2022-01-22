import { Route } from '../../models/route.model.js'

const deleteLikeFromRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteLikeFromRoute }
