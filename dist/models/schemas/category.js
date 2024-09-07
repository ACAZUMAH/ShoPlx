"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'category name required'],
        trim: true
    },
    parent_catalog: {
        type: mongoose_1.Types.ObjectId,
        ref: 'catalog'
    },
    brands: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'brands'
        }],
    products_Ids: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'products'
        }]
});
const category = (0, mongoose_1.model)('category', categorySchema);
exports.default = category;
