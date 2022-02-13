import { Route } from '../../models/route.model.js'

const getRoutesCreatedByUser = async (id) => await Route.find({ ownerId: id })

export { getRoutesCreatedByUser }
