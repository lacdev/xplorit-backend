import { createSinglePlace } from '../../usecases/placeUsecases/createSinglePlace.js'
// import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
// import { ApiError } from '../../errors/ApiError.js'

const savePlace = async (req, res, next) => {
  try {
    const newPlace = req.body

    console.log(newPlace)

    //Extraeme el key userId de mi object req.body y luego el resto de los key/values
    //spread operator ponlos ahi en el resto del objeto.

    // const foundUser = getSingleUser(userId)

    const savedPlace = await createSinglePlace(newPlace)

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
    next({})
  }
}

export { savePlace }
