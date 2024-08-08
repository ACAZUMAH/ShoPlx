import { Schema, model } from "mongoose";

const catlogSchema = new Schema({
    name:{
        type: String,
        required: [true, 'catalog name required']
    },
    sub_categories:{
        type: Array
    }
})
const categorySchema = new Schema({
    name:{
        type: String,
        required: [true, 'category name required']
    },
    sub_categories:{
        type: Array
    },
    parent_categories:{
        type: Array
    }
})
const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'brand name required']
    },
    parent_categories: {
        type: Array
    },
    poducts_Id:{
        tyoe: Array
    }
})
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
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
        //enum: ['ikea', 'liddy', 'caressa', 'marcos']
    }
})

export const catalog = model('catalog', catlogSchema)
export const category = model('category', categorySchema)
export const products = model('products', productsSchema)