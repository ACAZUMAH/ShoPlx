"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const catalogSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'catalog name required'],
        trim: true
    },
    sub_categories: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'category'
        }]
});
const catalog = (0, mongoose_1.model)('Catalogs', catalogSchema);
exports.default = catalog;
