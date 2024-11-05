"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLaptopProductById = exports.postLaptop = void 0;
const laptops_1 = __importDefault(require("../../../../models/schemas/products/laptops"));
const http_errors_1 = __importDefault(require("http-errors"));
const postLaptop = async (_req) => {
    const { category_id, location, pictures, type_id, brand_id, model, processor, condition, cores, RAM, storageCapacity, storageType, displaySize, graphicCard, graphicCardMemory, operatingSystem, color, description, price, phone } = _req.body;
    const product = await laptops_1.default.create({
        user_id: _req.user._id,
        category_id,
        location,
        pictures_ref: pictures,
        type_id,
        brand_id,
        model,
        processor,
        condition,
        cores,
        RAM,
        storageCapacity,
        storageType,
        displaySize,
        graphicCard,
        graphicCardMemory,
        operatingSystem,
        color,
        description,
        price,
        phone
    });
};
exports.postLaptop = postLaptop;
/**
 * find laptop products by id
 * @param _id - laptop id
 * @returns laptop
 * @throws error when laptop not found
 */
const findLaptopProductById = async (_id) => {
    const product = await laptops_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('products not found');
    return product;
};
exports.findLaptopProductById = findLaptopProductById;
