const getLikesInRoute = async (req, res) => {
  const { routeId } = req.params

  try {
    const foundRoute = await route.getSingleRoute(routeId)

    const allLikesInRoute = await like.getLikesFromRoute(foundRoute._id)

    res.json({
      message: 'success',
      payload: {
        data: allLikesInRoute,
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

export { getLikesInRoute }
