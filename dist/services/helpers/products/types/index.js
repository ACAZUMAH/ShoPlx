"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCategoryType = void 0;
const type_1 = __importDefault(require("../../../../models/schemas/type"));
const category_1 = require("../category");
/**
 * find types that belong to a particular category
 * @param _id - category id
 * @returns types
 */
const findCategoryType = async (_id) => {
    const category = await (0, category_1.getCategoryById)(_id);
    const type = [];
    for (const brandId of category.types) {
        const brandData = await type_1.default.findById(brandId);
        if (brandData)
            type.push(brandData);
    }
    return type;
};
exports.findCategoryType = findCategoryType;
