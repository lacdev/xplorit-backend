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

export { deleteReviewInPlace }
