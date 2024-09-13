"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAccessoryProductById = void 0;
const accessories_1 = __importDefault(require("../../../../models/schemas/products/accessories"));
const http_errors_1 = __importDefault(require("http-errors"));
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
