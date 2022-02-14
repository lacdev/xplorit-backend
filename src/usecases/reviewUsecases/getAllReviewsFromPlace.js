import { Review } from '../../models/review.model.js'

const getAllReviewsFromPlace = async (query, requestQuery = {}) => {
  const myCustomLabels = {
    totalDocs: 'totalReviews',
    docs: 'reviews',
  }

  const options = {
    page: requestQuery.page || 1,
    limit: requestQuery.limit || 6,
    projection: {
      _id: 1,
      comment: 1,
      stars: 1,
      placeId: 1,
      userId: 1,
    },
    customLabels: myCustomLabels,
  }

  // , avatar: 1, coverPhoto: 1, createdAt: 1

  // return await Review.paginate(query, options)

  return await Review.find(query).populate('userId', {
    username: 1,
    avatar: 1,
    _id: 0,
  })
}

// const getAllReviewsFromPlace = async (id) => {
//   try {
//     return await Review.find(id)
//   } catch (error) {
//     console.error(error)
//   }
// }

export { getAllReviewsFromPlace }
