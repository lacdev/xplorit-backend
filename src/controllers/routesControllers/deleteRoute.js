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

export { deleteRoute }
