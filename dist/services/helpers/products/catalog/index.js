"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatelogByName = exports.getCatelogById = exports.getAllCatalogs = void 0;
const catalog_1 = __importDefault(require("../../../../models/schemas/catalog"));
const http_errors_1 = __importDefault(require("http-errors"));
const getAllCatalogs = async () => {
    return await catalog_1.default.find({ $or: [{ name: 'Electronics' }, { name: 'Phones & Tablets' }, { name: 'Home,Appliances & furniture' }] });
};
exports.getAllCatalogs = getAllCatalogs;
const getCatelogById = async (id) => {
    return await catalog_1.default.findById(id);
};
exports.getCatelogById = getCatelogById;
const getCatelogByName = async (name) => {
    if (!await catalog_1.default.findOne({ name })) {
        throw new http_errors_1.default.BadRequest('category not found');
    }
    return catalog_1.default.findOne({ name });
};
exports.getCatelogByName = getCatelogByName;
