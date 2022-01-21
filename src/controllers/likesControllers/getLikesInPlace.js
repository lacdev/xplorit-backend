const getLikesInPlace = async (req, res) => {
  const { placeId } = req.params

  try {
    const foundPlace = await route.getSingleRoute(placeId)

    const allLikesInPlace = await like.getLikesFromPlace(foundPlace._id)

    res.json({
      message: 'success',
      payload: {
        data: allLikesInPlace,
        description: 'Likes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get likes.',
        statusCode: 404,
      },
    })
  }
}

export { getLikesInPlace }
