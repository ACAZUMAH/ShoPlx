"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCategoryBrand = exports.findBrandByIdAndUpdate = void 0;
const brand_1 = __importDefault(require("../../../../models/schemas/brand"));
const http_errors_1 = __importDefault(require("http-errors"));
const category_1 = require("../category");
/**
 * find brand by id and push product id to the products_Ids array
 * @param _id - brand id
 * @param product_id - product id
 * @returns - true
 * @throws - error when brand not found
 */
const findBrandByIdAndUpdate = async (_id, product_id) => {
    if (!await brand_1.default.exists({ _id }))
        throw new http_errors_1.default.BadRequest('brand not found');
    await brand_1.default.findByIdAndUpdate(_id, { $push: { products_Ids: product_id } });
    return true;
};
exports.findBrandByIdAndUpdate = findBrandByIdAndUpdate;
/**
 * find brands that belong to a particular category
 * @param _id - category id
 * @returns brands
 * @throws error when category not found
 */
const findCategoryBrand = async (_id) => {
    const category = await (0, category_1.getCategoryById)(_id);
    const brands = [];
    for (const brandId of category.brands) {
        const brandData = await brand_1.default.findById(brandId);
        if (brandData)
            brands.push(brandData);
    }
    return brands;
};
exports.findCategoryBrand = findCategoryBrand;
