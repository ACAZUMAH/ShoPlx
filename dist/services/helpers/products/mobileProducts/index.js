"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMbileProuct = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const product_1 = require("../../../../models/schemas/product");
const category_1 = require("../category");
const brands_1 = require("../brands");
/**
 * save mobile phone product to the database
 * @param req - Request
 * @returns true
 */
const createMbileProuct = async (req) => {
    const { category_id, location, pictures, brand_id, model, condition, secondCondition, color, exchange, description, price, phone } = req.body;
    const product = await product_1.mobilePhone.create({
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
exports.createMbileProuct = createMbileProuct;
