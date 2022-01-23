import bcrypt from 'bcrypt'

const DEFAULT_SALT_ROUNDS = 10

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, DEFAULT_SALT_ROUNDS)
    return hash
  } catch (error) {
    console.log(error)
  }
}

export { hashPassword }
