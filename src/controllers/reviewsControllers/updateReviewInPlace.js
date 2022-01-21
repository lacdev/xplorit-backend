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

export { updateReviewInPlace }
