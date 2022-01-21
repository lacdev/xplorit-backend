const getUser = async (req, res) => {
  const { id } = req.params

  try {
    const singleUser = await user.getSingleUser(id)

    res.json({
      message: 'success',
      payload: {
        data: singleUser,
        description: 'User found',
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

export { getUser }
