import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const LikeSchema = new mongoose.Schema(
  {
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

LikeSchema.plugin(paginate)

const Like = mongoose.model('like', LikeSchema)

export { Like }
