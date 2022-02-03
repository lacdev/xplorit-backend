import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'

const getLikesInPlace = async (req, res, next) => {
  const { placeId } = req.params
  try {
    
    const allLikesInPlace = await getLikesFromPlace({ placeId: placeId })
  
    
    if(allLikesInPlace) {
      console.log(allLikesInPlace)
      res.json({
        message: 'success',
        payload: {
          data: allLikesInPlace,
          description: 'Likes found successfully',
          statusCode: 200,
        },
      })
    }

  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getLikesInPlace }
