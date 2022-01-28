import { getAllPlaces } from '../../usecases/placeUsecases/getAllPlaces.js'

const getPlaces = async (req, res, next) => {
  try {
    const allPlaces = await getAllPlaces()

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
    next({})
  }
}

export { getPlaces }
