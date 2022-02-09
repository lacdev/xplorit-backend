import { Route } from '../../models/route.model.js'

const deleteSingleRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteSingleRoute }
