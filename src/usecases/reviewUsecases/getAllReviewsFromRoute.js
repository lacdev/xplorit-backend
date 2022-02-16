import { Review } from '../../models/review.model.js'

const getAllReviewsFromRoute = async (query) => {
  const myCustomLabels = {
    totalDocs: 'totalReviews',
    docs: 'reviews',
  }

  let user = { path: 'userId', select: 'username avatar' }

  const options = {
    page: 1,
    limit: 10,
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

  return await Review.paginate(query, options)
}

export { getAllReviewsFromRoute }
