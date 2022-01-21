const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const deletedUser = await user.deleteSingleUser(id)

    if (deletedUser) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted user successfully',
          statusCode: 204,
        },
      })
    }
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

export { deleteUser }
