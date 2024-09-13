"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHeadphoneProductById = void 0;
const headphones_1 = __importDefault(require("../../../../models/schemas/products/headphones"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * find headphone products by id
 * @param _id - headphone id
 * @returns headphone
 * @throws error when headphone not found
 */
const findHeadphoneProductById = async (_id) => {
    const product = await headphones_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('headphone not found');
    return product;
};
exports.findHeadphoneProductById = findHeadphoneProductById;
