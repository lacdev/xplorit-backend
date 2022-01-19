import { Schema, model } from 'mongoose'

const ReviewSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
    },
    route: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
    },
  },
  { timestamps: true }
)

const Review = model('review', ReviewSchema)

export default Review
