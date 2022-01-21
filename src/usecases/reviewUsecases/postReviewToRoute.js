const postReviewToRoute = async (id, review) => await Route.findById(id, review)

export { postReviewToRoute }
