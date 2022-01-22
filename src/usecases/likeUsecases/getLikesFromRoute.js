import { Like } from 'models/like.model'
import Route from 'models/route.model'

const getLikesFromRoute = async (id) => await Route.findById(id)

export { getLikesFromRoute }
