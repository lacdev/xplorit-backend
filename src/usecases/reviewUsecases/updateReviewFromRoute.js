const updateReviewFromRoute = async (id, body) =>
  await Route.findByIdAndUpdate(id, body)

export { updateReviewFromRoute }
