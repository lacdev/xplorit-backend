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

export { updateReviewInRoute }
