import { Review } from '../../models/review.model.js'

const getReviewsMadeByUser = async (id) =>
  await Review.find({ userId: id })
    .populate({
      path: 'placeId',
      select: 'name images',
    })
    .populate({
      path: 'routeId',
      select: 'name images',
    })

export { getReviewsMadeByUser }
