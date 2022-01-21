const saveUser = async (req, res) => {
  try {
    const { newUser } = req.body

    const savedUser = await user.createSingleUser(newUser)

    res.json({
      message: 'success',
      payload: {
        data: savedUser,
        description: 'User created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not create user.',
        statusCode: 400,
      },
    })
  }
}

export { saveUser }
