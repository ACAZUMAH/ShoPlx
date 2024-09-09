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
    if (!await headphones_1.default.exists({ _id }))
        throw new http_errors_1.default.BadRequest('headphone not found');
    return headphones_1.default.findById(_id);
};
exports.findHeadphoneProductById = findHeadphoneProductById;
