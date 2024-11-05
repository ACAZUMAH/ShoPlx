"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTypeByIdAndUpdate = exports.findCategoryType = void 0;
const type_1 = __importDefault(require("../../../../models/schemas/type"));
const http_errors_1 = __importDefault(require("http-errors"));
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
/**
 * find type by id and push product id to the products_Ids array
 * @param _id - type id
 * @param product_id - product id
 * @returns true
 * @throws error when type not found
 */
const findTypeByIdAndUpdate = async (_id, product_id) => {
    if (!(await type_1.default.exists({ _id })))
        throw new http_errors_1.default.BadRequest('type not found');
    if (product_id) {
        await type_1.default.findByIdAndUpdate(_id, {
            $push: { products_Ids: product_id }
        });
    }
    return true;
};
exports.findTypeByIdAndUpdate = findTypeByIdAndUpdate;
