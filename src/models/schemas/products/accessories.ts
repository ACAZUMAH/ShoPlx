import { Schema } from 'mongoose';

export const accesoriesSchema = new Schema(
    {
        title: { type: String, required: true},
        bandcolor:{ type: String }
    }
)

