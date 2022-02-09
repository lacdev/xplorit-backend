import { Route } from '../../models/route.model.js'

const getAllRoutes = async (query) => {
  const myCustomLabels = {
    totalDocs: 'totalRoutes',
    docs: 'routes',
  }

  const options = {
    page: query.page,
    limit: query.limit,
    customLabels: myCustomLabels,
  }

  console.log('Query found??', query)

  try {
    return await Route.paginate({}, options)
  } catch (error) {
    console.error(error)
  }
}

export { getAllRoutes }
