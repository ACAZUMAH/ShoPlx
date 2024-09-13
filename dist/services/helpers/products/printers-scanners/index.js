"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPrinterScannerProductById = void 0;
const printers_1 = __importDefault(require("../../../../models/schemas/products/printers"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * find printer and scanner products by id
 * @param _id - printer scanner id
 * @returns printer scanner
 * @throws error when printer scanner not found
 */
const findPrinterScannerProductById = async (_id) => {
    const product = await printers_1.default.findById(_id);
    if (!product)
        throw new http_errors_1.default.BadRequest('printer scanner not found');
    return product;
};
exports.findPrinterScannerProductById = findPrinterScannerProductById;
