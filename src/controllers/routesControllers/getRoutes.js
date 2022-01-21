const getRoutes = async (req, res) => {
  try {
    const allRoutes = await route.getAllRoutes()

    res.json({
      message: 'success',
      payload: {
        data: allRoutes,
        description: 'Routes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get routes.',
        statusCode: 404,
      },
    })
  }
}

export { getRoutes }
