import { Schema, model } from 'mongoose'

const RouteSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
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

const Route = model('route', RouteSchema)

export default Route
