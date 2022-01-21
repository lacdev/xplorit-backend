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

export { deleteLikeInPlace }
