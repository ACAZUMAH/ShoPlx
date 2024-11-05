import { Schema } from 'mongoose';

export const musicEquipmentSchema = new Schema({
    title: { type: String, required: true },
    exchange: { types: Boolean },
})

