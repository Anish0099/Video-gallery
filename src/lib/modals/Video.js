
import { model, models, Schema } from "mongoose";

const VideoSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export const Video = models?.Video || model('Video', VideoSchema);