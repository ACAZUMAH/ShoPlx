"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMobileProductById = exports.postMobile = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mobile_1 = __importDefault(require("../../../../models/schemas/products/mobile"));
const category_1 = require("../category");
const brands_1 = require("../brands");
/**
 * save mobile phone product to the database
 * @param req - Request
 * @returns true
 * @throws error when unable to create product
 */
const postMobile = async (req) => {
    const { category_id, location, pictures, brand_id, model, condition, secondCondition, color, exchange, description, price, phone } = req.body;
    const product = await mobile_1.default.create({
        user_id: req.user._id,
        category_id,
        location,
        pictures_ref: pictures,
        brand_id,
        model,
        condition,
        secondCondition,
        color,
        exchange,
        description,
        price,
        phone
    });
    if (!product)
        throw new http_errors_1.default.InternalServerError('unable to create product');
    await (0, brands_1.findBrandByIdAndUpdate)(brand_id, product._id);
    await (0, category_1.findCategoryByIdAndUpdate)(category_id, product._id);
    return true;
};
exports.postMobile = postMobile;
/**
 * find mobile phone products by id
 * @param _id - mobile phone id
 * @returns mobile phone
 * @throws error when mobile phone not found
 */
const findMobileProductById = async (_id) => {
    const product = await mobile_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('products not found');
    return product;
};
exports.findMobileProductById = findMobileProductById;
