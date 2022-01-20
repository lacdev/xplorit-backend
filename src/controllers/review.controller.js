import * as review from 'usecases/review.usecase'
import * as place from 'usecases/place.usecase'
import * as route from 'usecases/route.usecase'

const getReviewsInRoute = async (req, res) => {
  const { routeId } = req.params

  try {
    const foundRoute = await route.getSingleRoute(routeId)

    const allReviewsInRoute = await review.getAllReviewsFromRoute(
      foundRoute._id
    )

    res.json({
      message: 'success',
      payload: {
        data: allReviewsInRoute,
        description: 'Reviews found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get reviews.',
        statusCode: 404,
      },
    })
  }
}

const saveReviewInRoute = async (req, res) => {
  const { routeId } = req.params
  const { newReview } = req.body

  try {
    const foundRoute = await route.getSingleRoute(routeId)

    const savedReview = await review.postReviewToRoute(
      foundRoute._id,
      newReview
    )

    res.json({
      message: 'success',
      payload: {
        data: savedReview,
        description: 'Review created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not save review.',
        statusCode: 400,
      },
    })
  }
}

const updateReviewInRoute = async (req, res) => {
  const { routeId } = req.params
  const { updatedContent } = req.body
  try {
    const foundRoute = await route.getSingleRoute(routeId)

    const updatedReview = await review.updateReviewFromRoute(
      foundRoute._id,
      updatedContent
    )

    res.json({
      message: 'success',
      payload: {
        data: updatedReview,
        description: 'Updated review successfully',
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

const deleteReviewInRoute = async (req, res) => {
  const { id } = req.params

  try {
    const foundRoute = await route.getSingleRoute(id)

    const deletedReview = await review.deleteReviewInRoute(foundRoute._id)

    if (deletedReview) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted review successfully',
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

const getReviewsInPlace = async (req, res) => {
  const { placeId } = req.params

  try {
    const foundPlace = await place.getSinglePlace(placeId)

    const allReviewsInPlace = await review.getAllReviewsFromPlace(
      foundPlace._id
    )

    res.json({
      message: 'success',
      payload: {
        data: allReviewsInPlace,
        description: 'Reviews found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get reviews.',
        statusCode: 404,
      },
    })
  }
}

const saveReviewInPlace = async (req, res) => {
  const { placeId } = req.params
  const { newReview } = req.body

  try {
    const foundPlace = await place.getSinglePlace(placeId)

    const savedReview = await review.postReviewToPlace(
      foundPlace._id,
      newReview
    )

    res.json({
      message: 'success',
      payload: {
        data: savedReview,
        description: 'Review created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not save review.',
        statusCode: 400,
      },
    })
  }
}

const updateReviewInPlace = async (req, res) => {
  const { placeId } = req.params
  const { updatedContent } = req.body
  try {
    const foundPlace = await route.getSingleRoute(placeId)

    const updatedReview = await review.updateReviewFromPlace(
      foundPlace._id,
      updatedContent
    )

    res.json({
      message: 'success',
      payload: {
        data: updatedReview,
        description: 'Updated review successfully',
        statusCode: 200,
      },
    })
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

const deleteReviewInPlace = async (req, res) => {
  const { placeId } = req.params

  try {
    const foundPlace = await place.getSinglePlace(placeId)

    const deletedReview = await review.deleteReviewInRoute(foundPlace._id)

    if (deletedReview) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted review successfully',
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

export {
  getReviewsInRoute,
  saveReviewInRoute,
  updateReviewInRoute,
  deleteReviewInRoute,
  getReviewsInPlace,
  saveReviewInPlace,
  updateReviewInPlace,
  deleteReviewInPlace,
}
