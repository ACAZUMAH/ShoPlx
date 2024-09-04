import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'product name required']
    },
    price: {
        type: Number,
        required: [true, 'product price required']
    },
    featured:{
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    created_At: {
        type: Date,
        default: Date.now()
    },
    parent_categories: {
        type: Array
    },
    brand: {
        type: String
    },
})

const mobileproduct = new Schema({
    brand_id: {
        type: String,
        required: [true, 'brand name required']
    },
    model: {
        type: String,
        required: [true, 'model name required']
    },
    condition: {
        type: String,
        required: [true, 'condition required']
    },
    secondCondition: {
        type: String
    },
    exchange: {
        types: Boolean
    },
    description: {
        type: String
    },
    price:{
        type: String,
        required: [true, 'price required']
    },
    phone:{
        type: String
    },
    
})

export const products = model('products', productsSchema)