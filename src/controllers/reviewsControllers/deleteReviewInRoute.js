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

export { deleteReviewInRoute }
