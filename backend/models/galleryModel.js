import mongoose, {Schema} from "mongoose";

const gallerySchema = new Schema({
    image: {
        public_id: {
         type: String
        },
        secure_url: {
         type: String
        }
     },
}, {timestamps: true}) 

const gallery = mongoose.model('Gallery', gallerySchema)

export default gallery