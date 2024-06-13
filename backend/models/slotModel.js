import mongoose, { Schema } from "mongoose";

const slotModel = new Schema({
    name: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
        type: String,
         required: true
    },
    recording_type: {
        type: String,
        required: true
    },
    session_duration: {
        type: String,
        required: true
    }
}, {timestamps: true})

const slot = mongoose.model('Slot', slotModel)

export default slot