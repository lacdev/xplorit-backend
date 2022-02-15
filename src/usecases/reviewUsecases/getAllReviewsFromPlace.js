import { Review } from '../../models/review.model.js'

const getAllReviewsFromPlace = async (query, requestQuery = {}) => {
  const myCustomLabels = {
    totalDocs: 'totalReviews',
    docs: 'reviews',
  }

  // populate: [{ path: 'userId' }],

  let user = { path: 'userId', select: 'username avatar' }
  // let place = { path: 'placeId'}
  // let user = { path: 'userId placeId' }

  const options = {
    page: requestQuery.page || 1,
    limit: requestQuery.limit || 6,
    populate: user,
    projection: {
      createdAt: 1,
      _id: 1,
      comment: 1,
      stars: 1,
      placeId: 1,
    },
    customLabels: myCustomLabels,
  }

  // , avatar: 1, coverPhoto: 1, createdAt: 1

  return await Review.paginate(query, options)

  // return await Review.find(query).populate('userId', {
  //   username: 1,
  //   avatar: 1,
  // })
}

export { getAllReviewsFromPlace }
