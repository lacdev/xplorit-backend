import mongoose from 'mongoose'

const RouteSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    tags: {
      type: Array,
      required: true,
    },
    fullRoute: {
      type: Array,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
)

const Route = mongoose.model('route', RouteSchema)

export { Route }
