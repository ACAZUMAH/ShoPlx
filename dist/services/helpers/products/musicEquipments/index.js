"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMusicEquipProductById = void 0;
const musicEquip_1 = __importDefault(require("../../../../models/schemas/products/musicEquip"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * find audio and music equipment products by id
 * @param _id - music equipment id
 * @returns music equipment
 * @throws error when music equipment not found
 */
const findMusicEquipProductById = async (_id) => {
    const product = await musicEquip_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('products not found');
    return product;
};
exports.findMusicEquipProductById = findMusicEquipProductById;
