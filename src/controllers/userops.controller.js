import * as user from '../usecases/user.usecase.js'

const getLikesByUser = async (req, res) => {
  const { id } = req.params

  try {
    const likesByUser = user.getLikesMadeByUser(id)

    res.json({
      message: 'success',
      payload: {
        data: likesByUser,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'User not found.',
        statusCode: 404,
      },
    })
  }
}

const getReviewsByUser = async (req, res) => {
  const { id } = req.params

  try {
    const reviewsByUser = user.getReviewsMadeByUser(id)

    res.json({
      message: 'success',
      payload: {
        data: reviewsByUser,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'User not found.',
        statusCode: 404,
      },
    })
  }
}

const getPlacesByUser = async (req, res) => {
  const { id } = req.params

  try {
    const placesByUser = user.getPlacesCreatedByUser(id)

    res.json({
      message: 'success',
      payload: {
        data: placesByUser,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'User not found.',
        statusCode: 404,
      },
    })
  }
}

const getRoutesByUser = async (req, res) => {
  const { id } = req.params

  try {
    const routesByUser = user.getRoutesCreatedByUser(id)

    res.json({
      message: 'success',
      payload: {
        data: routesByUser,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'User not found.',
        statusCode: 404,
      },
    })
  }
}

export { getLikesByUser, getReviewsByUser, getPlacesByUser, getRoutesByUser }
