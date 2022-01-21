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

export { deleteLikeInRoute }
