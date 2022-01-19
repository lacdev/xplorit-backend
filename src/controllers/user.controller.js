import * as user from 'usecases/user.usecase'

const getUsers = async (req, res) => {
  try {
    const allUsers = user.getAllUsers()

    res.json({
      message: 'success',
      payload: {
        data: allUsers,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get users.',
      },
    })
  }
}

const createUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req.body

    const updatedUser = await user.updateSingleUser(id, body)

    res.json({
      message: 'success',
      payload: {
        data: updatedUser,
        description: 'Updated user successfully',
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

export { getUsers, getUser, updateUser, deleteUser, createUser }
