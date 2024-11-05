"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSmartWatchProductById = void 0;
const smartWatch_1 = __importDefault(require("../../../../models/schemas/products/smartWatch"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * find smart watch products by id
 * @param _id - smart watch id
 * @returns smart watch
 * @throws error when smart watch not found
 */
const findSmartWatchProductById = async (_id) => {
    const product = await smartWatch_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('products not found');
    return product;
};
exports.findSmartWatchProductById = findSmartWatchProductById;
