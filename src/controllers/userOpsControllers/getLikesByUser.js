const getLikesByUser = async (req, res) => {
  const { id } = req.params

  try {
    const likesByUser = user.getLikesMadeByUser(id)

    res.json({
      message: 'success',
      payload: {
        data: likesByUser,
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

export { getLikesByUser }
