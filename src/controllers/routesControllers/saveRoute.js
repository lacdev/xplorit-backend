const saveRoute = async (req, res) => {
  const { newRoute } = req.body

  try {
    const savedRoute = await route.createRoute(newRoute)

    res.json({
      message: 'success',
      payload: {
        data: savedRoute,
        description: 'Route created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not create route.',
        statusCode: 400,
      },
    })
  }
}

export { saveRoute }
