import { Like } from '../../models/like.model.js'

const searchForUserBeforeCreation = async (object) => {
  try {
    return await Like.find(object, { lean: true })
  } catch (error) {
    console.error(error)
  }
}

export { searchForUserBeforeCreation }
