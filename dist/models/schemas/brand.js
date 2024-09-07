"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'brand name required']
    },
    parent_categories: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'category'
        }],
    products_Ids: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'products'
        }]
});
const brand = (0, mongoose_1.model)('brands', brandSchema);
exports.default = brand;
