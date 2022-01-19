import { User } from 'models/user.model'

const getAllUsers = async () => User.find()

const getUserById = async (id) => User.findById(id)

const getLikesByUserId = async (id) => User.findById(id)

const getReviewsByUserId = async (id) => User.findById(id)

const getPlacesCreatedByUserId = async (id) => User.findById(id)

const getRoutesCreatedByUserId = async (id) => User.findById(id)

export {
  getUserById,
  getAllUsers,
  getLikesByUserId,
  getReviewsByUserId,
  getPlacesCreatedByUserId,
  getRoutesCreatedByUserId,
}
