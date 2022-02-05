import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const imagesArrayLimit = (val) => val.length <= 6

// const locationArrayLimit = (val) => val.length === 2

const tagsArrayLimit = (val) => val.length <= 4

// const pointSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true,
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//   },
// })

// fullroute = [[123, -123], [456, -456]]
//

const RouteSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
      type: [
        {
          type: String,
          required: true,
        },
      ],
      validate: [
        tagsArrayLimit,
        'Tags array must have a maximum of 4 String items.',
      ],
    },
    fullRoute: {
      type: Array,
      required: true,
    },
    images: {
      type: [
        {
          type: String,
          required: [
            true,
            'You must provide an array of image URL with a maximum of 6 items.',
          ],
        },
      ],
      validate: [imagesArrayLimit, 'Images max items must be 6.'],
    },
  },
  { timestamps: true }
)

RouteSchema.plugin(paginate)

const Route = mongoose.model('route', RouteSchema)

export { Route }
