import mongoose from 'mongoose'

const stateSchema = new mongoose.Schema(
  {
    estado: { type: String, required: true },
    municipios: { type: Array, required: true },
  },

  { timestamps: true }
)

const State = mongoose.model('state', stateSchema)

export { State }
