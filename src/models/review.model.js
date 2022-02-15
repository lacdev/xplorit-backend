import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const ReviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      maxlength: 300,
      required: true,
    },
    stars: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    avatar: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'place',
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'route',
    },
  },
  { timestamps: true }
)

ReviewSchema.plugin(paginate)

const Review = mongoose.model('review', ReviewSchema)

export { Review }
