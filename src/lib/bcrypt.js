import bcrypt from 'bcrypt'

const DEFAULT_SALT_ROUNDS = 10

const hashPassword = async (password) =>
  await bcrypt.hash(password, DEFAULT_SALT_ROUNDS)

const comparePassword = async (password, dbHash) =>
  await bcrypt.compare(password, dbHash)

export { hashPassword, comparePassword }
