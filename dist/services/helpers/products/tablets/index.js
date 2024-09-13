"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTabletProductById = void 0;
const tablets_1 = __importDefault(require("../../../../models/schemas/products/tablets"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * find tablet products by id
 * @param _id - tablet id
 * @returns tablet
 * @throws error when tablet not found
 */
const findTabletProductById = async (_id) => {
    const product = await tablets_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('tablet not found');
    return product;
};
exports.findTabletProductById = findTabletProductById;
