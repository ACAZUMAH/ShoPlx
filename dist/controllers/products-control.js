"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.getAllProducts = exports.getAllProductsStatic = void 0;
const product_1 = __importDefault(require("../models/schemas/product"));
const getAllProductsStatic = async (req, res, next) => {
    const product = await product_1.default.find({}).sort('created_At').limit(40);
    res.status(200).json({ sucess: true, data: product, nbHits: product.length });
};
exports.getAllProductsStatic = getAllProductsStatic;
const getAllProducts = async (req, res) => {
    const product = await product_1.default
        .find({ price: { $gt: 30 } })
        .sort('name')
        .select('name price rating company');
    res.status(200).json({ sucess: true, data: product, nbHits: product.length });
};
exports.getAllProducts = getAllProducts;
const searchProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        const filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters.split(',')
            .forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }
    console.log(queryObject);
    let result = product_1.default.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('created_At');
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const product = await result;
    res.status(200).json({ success: true, data: product, nbHits: product.length });
};
exports.searchProducts = searchProducts;
