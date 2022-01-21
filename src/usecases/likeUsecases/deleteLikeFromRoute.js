const deleteLikeFromRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteLikeFromRoute }
