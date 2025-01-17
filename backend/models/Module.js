import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true // Corrected this line
    },
    description: {
        type: String,
        required: true
    },
    skillsAcquired: {
        type: [String],
        required: true
    },
    videos: {
        type: [String],
        required: true
    },
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);
export default Module;