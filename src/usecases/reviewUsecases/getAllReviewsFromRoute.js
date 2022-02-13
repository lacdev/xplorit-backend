import { Review } from '../../models/review.model.js'

const getAllReviewsFromRoute = async (id, query) => {
  const myCustomLabels = {
    totalDocs: 'totalReviews',
    docs: 'reviews',
  }

  const options = {
    page: query.page,
    limit: query.limit,
    customLabels: myCustomLabels,
  }

  try {
    return await Review.paginate({ routeId: id }, options)
  } catch (error) {
    console.error(error)
  }
}

// const getAllReviewsFromRoute = async (id) => {

//   try {
//     return await Review.find(id)
//   } catch (error) {
//     console.error(error)
//   }
// }

export { getAllReviewsFromRoute }
