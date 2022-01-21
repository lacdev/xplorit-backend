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

export { deletePlace }
