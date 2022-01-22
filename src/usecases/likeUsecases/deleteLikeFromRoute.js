import { Like } from 'models/like.model'
import Route from 'models/route.model'

const deleteLikeFromRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteLikeFromRoute }
