import { User } from 'models/user.model'

const getAllUsers = async () => await User.find()

const getSingleUser = async (id) => await User.findById(id)

const getLikesMadeByUser = async (id) => await User.findById(id)

const getReviewsMadeByUser = async (id) => await User.findById(id)

const getPlacesCreatedByUser = async (id) => await User.findById(id)

const getRoutesCreatedByUser = async (id) => await User.findById(id)

export {
  getSingleUser,
  getAllUsers,
  getLikesMadeByUser,
  getReviewsMadeByUser,
  getPlacesCreatedByUser,
  getRoutesCreatedByUser,
}
