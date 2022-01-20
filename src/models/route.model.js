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
      minlength: 50,
    },
    tags: {
      type: Array,
      required: true,
      validate: {
        validator: function (array) {
          return array.every(
            (tag) => typeof tag === 'string' && array.length <= 4
          )
        },
      },
    },
    fullRoute: {
      type: Array,
      required: true,
      validate: {
        validator: function (array) {
          return array.every(
            (ubication) => typeof ubication === 'object' && array.length <= 10
          )
        },
      },
    },
    images: {
      type: Array,
      required: true,
      validate: {
        validator: function (array) {
          return array.every(
            (image) => typeof image === 'string' && array.length <= 6
          )
        },
      },
    },
  },
  { timestamps: true }
)

const Route = mongoose.model('route', RouteSchema)

export { Route }
