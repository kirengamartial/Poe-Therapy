import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
     type: String,
     required: true
    },
    image: {
        public_id: {
         type: String
        },
        secure_url: {
         type: String
        }
     },
}, {timestamps: true}) 

const blog = mongoose.model('Blog', blogSchema)

export default blog