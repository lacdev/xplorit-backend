import mongoose from 'mongoose'

const dbConnect = ({ DB_USER, DB_HOST, DB_PASS, DB_NAME }) => {
  const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

  return mongoose.connect(URL)
}

export default dbConnect
