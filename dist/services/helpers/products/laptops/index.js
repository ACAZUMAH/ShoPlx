"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLaptopProductById = void 0;
const laptops_1 = __importDefault(require("../../../../models/schemas/products/laptops"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * find laptop products by id
 * @param _id - laptop id
 * @returns laptop
 * @throws error when laptop not found
 */
const findLaptopProductById = async (_id) => {
    const product = await laptops_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('laptop not found');
    return product;
};
exports.findLaptopProductById = findLaptopProductById;
