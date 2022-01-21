const deleteSingleRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteSingleRoute }
