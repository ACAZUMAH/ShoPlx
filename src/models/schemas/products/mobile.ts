import { Schema, model } from "mongoose";

const mobileproduct = new Schema({
    category_id: {
        type: String,
        required: [true, 'category name required']
    },
    location:{
        type: String,
        required: [true, 'location required']
    },
    pictures_ref: [{
        type: String
    }],
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
    color:{
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
    created_At: {
        type: Date,
        default: Date.now()
    }
})

const mobilePhone = model('Mobile Phones products', mobileproduct)
export default mobilePhone