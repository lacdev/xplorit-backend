import mongoose from 'mongoose'

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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
    },
  },
  { timestamps: true }
)

const Review = mongoose.model('review', ReviewSchema)

export { Review }
