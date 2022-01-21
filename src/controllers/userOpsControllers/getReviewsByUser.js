const getReviewsByUser = async (req, res) => {
  const { id } = req.params

  try {
    const reviewsByUser = user.getReviewsMadeByUser(id)

    res.json({
      message: 'success',
      payload: {
        data: reviewsByUser,
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

export { getReviewsByUser }
