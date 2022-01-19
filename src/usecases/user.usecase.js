import { User } from 'models/user.model'

const getAllUsers = async () => await User.find()

const getUserById = async (id) => await User.findById(id)

const getLikesByUserId = async (id) => await User.findById(id)

const getReviewsByUserId = async (id) => await User.findById(id)

const getPlacesCreatedByUserId = async (id) => await User.findById(id)

const getRoutesCreatedByUserId = async (id) => await User.findById(id)

export {
  getUserById,
  getAllUsers,
  getLikesByUserId,
  getReviewsByUserId,
  getPlacesCreatedByUserId,
  getRoutesCreatedByUserId,
}
