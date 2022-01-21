const getPlacesByUser = async (req, res) => {
  const { id } = req.params

  try {
    const placesByUser = user.getPlacesCreatedByUser(id)

    res.json({
      message: 'success',
      payload: {
        data: placesByUser,
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

export { getPlacesByUser }
