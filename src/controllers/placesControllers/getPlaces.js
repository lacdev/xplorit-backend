const getPlaces = async (req, res) => {
  try {
    const allPlaces = await place.getAllPlaces()

    res.json({
      message: 'success',
      payload: {
        data: allPlaces,
        description: 'Places found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get places.',
        statusCode: 404,
      },
    })
  }
}

export { getPlaces }
