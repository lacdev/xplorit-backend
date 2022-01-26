import { createSinglePlace } from '../../usecases/placeUsecases/createSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'






const savePlace = async (req, res) => {
  try {
    const { name, address, ownerID, city } = req.body

    const savedPlace = await createSinglePlace({
      name,
      address,
      ownerID,
      city,
    })

    if (savedPlace) {
      res.json({
        message: 'success',
        payload: {
          data: savedPlace,
          description: 'Place created successfully',
          statusCode: 200,
        },
      })
    }
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

export { savePlace }
