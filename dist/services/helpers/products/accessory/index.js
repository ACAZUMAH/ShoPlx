"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAccessoryProductById = exports.postAccessory = void 0;
const accessories_1 = __importDefault(require("../../../../models/schemas/products/accessories"));
const brands_1 = require("../brands");
const category_1 = require("../category");
const types_1 = require("../types");
const http_errors_1 = __importDefault(require("http-errors"));
const postAccessory = async (req) => {
    const { category_id, location, pictures_ref, title, brand_id, model, type_id, bandcolor, condition, description, price, phone } = req.body;
    const post = await accessories_1.default.create({
        user_id: req.user._id,
        category_id,
        location,
        pictures_ref,
        title,
        brand_id,
        model,
        type_id,
        bandcolor,
        condition,
        description,
        price,
        phone
    });
    if (!post)
        throw new http_errors_1.default.InternalServerError('something went wrong');
    await (0, brands_1.findBrandByIdAndUpdate)(brand_id, post._id);
    await (0, category_1.findCategoryByIdAndUpdate)(category_id, post._id);
    await (0, types_1.findTypeByIdAndUpdate)(type_id, post._id);
    return true;
};
exports.postAccessory = postAccessory;
/**
 * find accessory products by id
 * @param _id - accessory id
 * @returns accessory
 * @throws error when accessory not found
 */
const findAccessoryProductById = async (_id) => {
    const product = await accessories_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('accessory not found');
    return product;
};
exports.findAccessoryProductById = findAccessoryProductById;
