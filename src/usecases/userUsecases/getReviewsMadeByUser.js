import { User } from 'models/user.model'
import { Review } from 'models/review.model'

const getReviewsMadeByUser = async (id) => await User.findById(id)

export { getReviewsMadeByUser }
