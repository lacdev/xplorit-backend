import { User } from '../models/user.model.js'

const getAllUsers = async () => await User.find()

const getSingleUser = async (id) => await User.findById(id)

const createSingleUser = async (user) => await User.create(user)

const updateSingleUser = async (id, body) =>
  await User.findByIdAndUpdate(id, body)

const deleteSingleUser = async (id) => await User.findByIdAndDelete(id)

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
  updateSingleUser,
  deleteSingleUser,
  createSingleUser,
}
