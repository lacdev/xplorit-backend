const postLikeToRoute = async (id, like) =>
  await Route.findByIdAndUpdate(id, like)

export { postLikeToRoute }
