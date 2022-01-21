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

export { getRoutesByUser }
