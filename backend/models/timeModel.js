import mongoose, {Schema} from "mongoose";

const timeSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const time = mongoose.model('Time', timeSchema)

export default time