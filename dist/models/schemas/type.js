"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const typeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'type name required']
    },
    parent_category: {
        type: mongoose_1.Types.ObjectId,
    },
    products_Ids: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'products'
        }]
});
const type = (0, mongoose_1.model)('type', typeSchema);
exports.default = type;
