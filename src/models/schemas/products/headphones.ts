import { Schema } from 'mongoose';

export const headphoneSchema = new Schema(
    {
        title: { type: String, required: true },
        formFactor:{ type: String, required: true},
        connectivity:{ type: String, required: true },
    }
)
