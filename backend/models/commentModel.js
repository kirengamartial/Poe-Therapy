import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    blogId: {
        type: String,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    performance: {
        type: String,
        required: true
    },
    description: {
     type: String,
     required: true
    }
}, {timestamps: true}) 

const comment = mongoose.model('Comment', commentSchema)

export default comment