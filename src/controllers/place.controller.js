import * as place from 'usecases/place.usecase'

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

const savePlace = async (req, res) => {
  try {
    const { newPlace } = req.body

    const savedPlace = await place.createSinglePlace(newPlace)

    res.json({
      message: 'success',
      payload: {
        data: savedPlace,
        description: 'Place created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not create place.',
        statusCode: 400,
      },
    })
  }
}

const getPlace = async (req, res) => {
  const { id } = req.params

  try {
    const singlePlace = await place.getSinglePlace(id)

    res.json({
      message: 'success',
      payload: {
        data: singlePlace,
        description: 'Place found',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Place not found.',
        statusCode: 404,
      },
    })
  }
}

const updatePlace = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req.body

    const updatedPlace = await place.updateSinglePlace(id, body)

    res.json({
      message: 'success',
      payload: {
        data: updatedPlace,
        description: 'Updated place successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Place not found.',
        statusCode: 404,
      },
    })
  }
}

const deletePlace = async (req, res) => {
  try {
    const { id } = req.params

    const deletedPlace = await place.deleteSinglePlace(id)

    if (deletedPlace) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted place successfully',
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
        description: 'Place not found.',
        statusCode: 404,
      },
    })
  }
}

export { getPlaces, savePlace, getPlace, updatePlace, deletePlace }
