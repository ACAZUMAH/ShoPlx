"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const laptopProducts = new mongoose_1.Schema({
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
    type: {
        type: String,
        required: [true, 'type required']
    },
    brand_id: {
        type: String,
        required: [true, 'brand name required']
    },
    model: {
        type: String,
        required: [true, 'model name required']
    },
    processor: {
        type: String
    },
    condition: {
        type: String,
        required: [true, 'condition required']
    },
    cores: {
        type: String
    },
    RAM: {
        type: String,
        required: [true, 'RAM required']
    },
    storageCapacity: {
        type: String,
        required: [true, 'storage capacity required']
    },
    storageType: {
        type: String,
        required: [true, 'storage type required']
    },
    displaySize: {
        type: String,
        required: [true, 'display size required']
    },
    graphicCard: {
        type: String
    },
    graphicCardMemory: {
        type: String
    },
    operatingSystem: {
        type: String,
        required: [true, 'operating system required']
    },
    color: {
        type: String,
        required: [true, 'color required']
    },
    description: {
        type: String,
        required: [true, 'description required']
    },
});
const laptop = (0, mongoose_1.model)('products', laptopProducts);
exports.default = laptop;
