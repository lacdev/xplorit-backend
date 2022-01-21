const updateRoute = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req.body

    const updatedRoute = await route.updateSingleRoute(id, body)

    res.json({
      message: 'success',
      payload: {
        data: updatedRoute,
        description: 'Updated route successfully',
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

export { updateRoute }
