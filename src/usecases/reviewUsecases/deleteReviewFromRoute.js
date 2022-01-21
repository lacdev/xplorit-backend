const deleteReviewFromRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteReviewFromRoute }
