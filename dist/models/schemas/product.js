"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobilePhone = void 0;
const mongoose_1 = require("mongoose");
const mobileproduct = new mongoose_1.Schema({
    category_id: {
        type: String,
        required: [true, 'category name required']
    },
    location: {
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
    color: {
        type: String
    },
    exchange: {
        types: Boolean
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: [true, 'price required']
    },
    phone: {
        type: String
    },
    created_At: {
        type: Date,
        default: Date.now()
    }
});
exports.mobilePhone = (0, mongoose_1.model)('products', mobileproduct);
// const productsSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'product name required']
//     },
//     price: {
//         type: Number,
//         required: [true, 'product price required']
//     },
//     featured:{
//         type: Boolean,
//         default: false
//     },
//     rating: {
//         type: Number,
//         default: 4.5
//     },
//     created_At: {
//         type: Date,
//         default: Date.now()
//     },
//     parent_categories: {
//         type: Array
//     },
//     brand: {
//         type: String
//     },
// })
//export const products = model('products', productsSchema)
