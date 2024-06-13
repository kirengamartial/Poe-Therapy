import mongoose, {Schema} from "mongoose";

const studioSchema = new Schema({
    title: {
        type:String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    video: {
        public_id: {
         type: String
        },
        secure_url: {
         type: String
        }
     },   
}, {
    timestamps: true
})

const studio = mongoose.model('Studio', studioSchema)

export default studio