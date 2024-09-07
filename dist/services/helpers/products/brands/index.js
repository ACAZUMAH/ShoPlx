"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBrandByIdAndUpdate = void 0;
const brand_1 = __importDefault(require("../../../../models/schemas/brand"));
const http_errors_1 = __importDefault(require("http-errors"));
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
