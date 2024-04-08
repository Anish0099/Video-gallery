import { model, models, Schema } from "mongoose";

const VideoSchema = new Schema({

    url: {
        type: String,
        required: true
    }
});

export const Video = models?.Video || model('Video', VideoSchema);