"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tabletProducts = new mongoose_1.Schema({
    user_id: {
        type: String
    },
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
    storageCapacity: {
        type: String,
        required: [true, 'storage capacity required']
    },
    screen_size: {
        type: String,
        required: [true, 'screen size required']
    },
    RAM: {
        type: String,
        required: [true, 'RAM required']
    },
    color: {
        type: String,
        required: [true, 'color required']
    },
    exchange: {
        types: Boolean
    },
    description: {
        type: String,
        required: [true, 'description required']
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
const tablets = (0, mongoose_1.model)('tablets products', tabletProducts);
exports.default = tablets;
