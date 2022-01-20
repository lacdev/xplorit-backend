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
  },
  { timestamps: true }
)

const Like = mongoose.model('like', LikeSchema)

export { Like }
