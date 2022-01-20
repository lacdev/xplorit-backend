import * as route from '../usecases/route.usecase.js'

const getRoutes = async (req, res) => {
  try {
    const allRoutes = await route.getAllRoutes()

    res.json({
      message: 'success',
      payload: {
        data: allRoutes,
        description: 'Routes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get routes.',
        statusCode: 404,
      },
    })
  }
}

const saveRoute = async (req, res) => {
  const { newRoute } = req.body

  try {
    const savedRoute = await route.createRoute(newRoute)

    res.json({
      message: 'success',
      payload: {
        data: savedRoute,
        description: 'Route created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not create route.',
        statusCode: 400,
      },
    })
  }
}

const getRoute = async (req, res) => {
  const { id } = req.params

  try {
    const singleRoute = await route.getSingleRoute(id)

    res.json({
      message: 'success',
      payload: {
        data: singleRoute,
        description: 'Route found',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Route not found.',
        statusCode: 404,
      },
    })
  }
}

const updateRoute = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req.body

    const updatedRoute = await route.updateSingleRoute(id, body)

    res.json({
      message: 'success',
      payload: {
        data: updatedRoute,
        description: 'Updated route successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Route not found.',
        statusCode: 404,
      },
    })
  }
}

const deleteRoute = async (req, res) => {
  try {
    const { id } = req.params

    const deletedRoute = await route.deleteSingleRoute(id)

    if (deletedRoute) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted route successfully',
          statusCode: 204,
        },
      })
    }
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Route not found.',
        statusCode: 404,
      },
    })
  }
}

export { getRoutes, saveRoute, getRoute, updateRoute, deleteRoute }
