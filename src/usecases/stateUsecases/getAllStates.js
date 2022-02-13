import { State } from '../../models/state.model.js'

const getAllStates = async () => {
  let projection = { estado: 1, municipios: 1 }
  return await State.find({}).select(projection)
}

export { getAllStates }
