import * as like from 'usecases/like.usecase'
import * as place from 'usecases/place.usecase'
import * as route from 'usecases/route.usecase'

const getLikesInRoute = async (req, res) => {
  const { routeId } = req.params

  try {
    const foundRoute = await route.getSingleRoute(routeId)

    const allLikesInRoute = await like.getLikesFromRoute(foundRoute._id)

    res.json({
      message: 'success',
      payload: {
        data: allLikesInRoute,
        description: 'Likes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get likes.',
        statusCode: 404,
      },
    })
  }
}

const saveLikeInRoute = async (req, res) => {
  const { routeId } = req.params
  const { newLike } = req.body

  try {
    const foundRoute = await route.getSingleRoute(routeId)

    const savedLike = await like.postLikeToRoute(foundRoute._id, newLike)

    res.json({
      message: 'success',
      payload: {
        data: savedLike,
        description: 'Like created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not save like.',
        statusCode: 400,
      },
    })
  }
}

const deleteLikeInRoute = async (req, res) => {
  try {
    const { id } = req.params

    const foundRoute = await route.getSingleRoute(id)

    const deletedLike = await like.deleteLikeFromRoute(foundRoute._id)

    if (deletedLike) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted like successfully',
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

const getLikesInPlace = async (req, res) => {
  const { placeId } = req.params

  try {
    const foundPlace = await route.getSingleRoute(placeId)

    const allLikesInPlace = await like.getLikesFromPlace(foundPlace._id)

    res.json({
      message: 'success',
      payload: {
        data: allLikesInPlace,
        description: 'Likes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get likes.',
        statusCode: 404,
      },
    })
  }
}

const saveLikeInPlace = async (req, res) => {
  const { placeId } = req.params
  const { newLike } = req.body

  try {
    const foundRoute = await place.getSinglePlace(placeId)

    const savedLike = await like.postLikeToPlace(foundRoute._id, newLike)

    res.json({
      message: 'success',
      payload: {
        data: savedLike,
        description: 'Like created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not save like.',
        statusCode: 400,
      },
    })
  }
}

const deleteLikeInPlace = async (req, res) => {
  try {
    const { id } = req.params

    const foundPlace = await place.getSinglePlace(id)

    const deletedLike = await like.deleteLikeFromPlace(foundPlace._id)

    if (deletedLike) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted like successfully',
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
        description: 'Place not found.',
        statusCode: 404,
      },
    })
  }
}

export {
  getLikesInPlace,
  getLikesInRoute,
  saveLikeInPlace,
  saveLikeInRoute,
  deleteLikeInPlace,
  deleteLikeInRoute,
}
