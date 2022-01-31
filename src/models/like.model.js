import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema(
  {
    like: {
      type: Number,
      min: 1,
      max: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
    },
  },
  { timestamps: true }
)

const Like = mongoose.model('like', LikeSchema)

export { Like }
