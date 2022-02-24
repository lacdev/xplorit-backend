import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const imagesArrayLimit = (val) => val.length <= 6

const tagsArrayLimit = (val) => val.length <= 4

const PlaceSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    name: {
      type: String,
      maxlength: 300,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    average: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        // type: Number,
        type: String,
      },
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
    scheduleStart: {
      type: Date,
      required: [true, 'A valid start date must be provided.'],
    },
    scheduleFinish: {
      type: Date,
      required: [true, 'A valid finish date must be provided.'],
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [
          {
            type: Number,
            required: [true, 'You must provide an array of valid coordinates.'],
          },
        ],
        index: '2dsphere',
        required: true,
      },
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

PlaceSchema.plugin(paginate)

const Place = mongoose.model('place', PlaceSchema)

export { Place }
