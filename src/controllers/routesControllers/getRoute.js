const getRoute = async (req, res) => {
  const { id } = req.params

  try {
    const singleRoute = await route.getSingleRoute(id)

    res.json({
      message: 'success',
      payload: {
        data: singleRoute,
        description: 'Route found',
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

export { getRoute }
