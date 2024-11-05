import { Schema } from 'mongoose';

export const printerScannerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
})
