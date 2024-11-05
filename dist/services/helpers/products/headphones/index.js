"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHeadphoneProductById = exports.postHeadphone = void 0;
const headphones_1 = __importDefault(require("../../../../models/schemas/products/headphones"));
const brands_1 = require("../brands");
const category_1 = require("../category");
const types_1 = require("../types");
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * save headphone product to the database
 * @param req - Request
 * @returns true
 * @throws error when unable to create product
 */
const postHeadphone = async (req) => {
    const { category_id, location, pictures, title, brand_id, model, type_id, formFactor, conectivity, condition, color, description, price, phone } = req.body;
    const product = await headphones_1.default.create({
        user_id: req.user._id,
        category_id,
        location,
        pictures_ref: pictures,
        title,
        brand_id,
        model,
        type_id,
        formFactor,
        conectivity,
        condition,
        color,
        description,
        price,
        phone
    });
    if (!product)
        throw new http_errors_1.default.InternalServerError('unable to create product');
    await (0, brands_1.findBrandByIdAndUpdate)(brand_id, product._id);
    await (0, category_1.findCategoryByIdAndUpdate)(category_id, product._id);
    await (0, types_1.findTypeByIdAndUpdate)(type_id, product._id);
    return true;
};
exports.postHeadphone = postHeadphone;
/**
 * find headphone products by id
 * @param _id - headphone id
 * @returns headphone
 * @throws error when headphone not found
 */
const findHeadphoneProductById = async (_id) => {
    const product = await headphones_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('products not found');
    return product;
};
exports.findHeadphoneProductById = findHeadphoneProductById;
