import { Schema, model } from 'mongoose'

const LikeSchema = new Schema(
  {
    like: {
      type: Number,
      max: 1,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Like = model('like', LikeSchema)

export default Like
