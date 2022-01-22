import Route from 'models/route.model'

const createRoute = async (route) => await Route.create(route)

export { createRoute }
