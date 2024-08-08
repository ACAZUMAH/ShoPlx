"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'product name required']
    },
    price: {
        type: Number,
        required: [true, 'product price required']
    },
    featured: {
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
});
const products = (0, mongoose_1.model)('products', productsSchema);
exports.default = products;
