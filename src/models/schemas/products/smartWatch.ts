import { Schema } from 'mongoose';

export const smartWatchSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title required']
    },
    bandColor:{
        type: String
    },
    bandMaterial: {
        type: String
    },
})