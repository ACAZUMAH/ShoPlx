import { Schema, model } from 'mongoose'

export const  tabletSchema = new Schema({
    storageCapacity: {
        type: String,
        required: true
    },
    screen_size: {
        type: String,
        required: true
    },
    RAM: {
        type: String,
        required: true
    },
    exchange: {
        types: Boolean
    },
})
