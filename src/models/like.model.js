import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema(
  {
    like: {
      type: Number,
      max: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
