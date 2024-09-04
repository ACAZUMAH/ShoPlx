"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.getAllProducts = exports.getAllProductsStatic = exports.postProducts = exports.getCategories = exports.getcatelogs = void 0;
const product_1 = require("../models/schemas/product");
const catalog_1 = require("../services/helpers/products/catalog");
const category_1 = require("../services/helpers/products/category");
const getcatelogs = async (req, res) => {
    const catalogs = await (0, catalog_1.getAllCatalogs)();
    return res.status(200).json({ success: true, data: await (0, category_1.returnName)(catalogs) });
};
exports.getcatelogs = getcatelogs;
const getCategories = async (req, res) => {
    const { catalog } = req.query;
    const categories = await (0, category_1.findcategory)(catalog);
    return res.status(200).json({ success: true, data: await (0, category_1.returnName)(categories) });
};
exports.getCategories = getCategories;
const postProducts = async (req, res) => {
};
exports.postProducts = postProducts;
const getAllProductsStatic = async (req, res, next) => {
    const product = await product_1.products.find({}).sort('created_At').limit(40);
    res.status(200).json({ sucess: true, data: product, nbHits: product.length });
};
exports.getAllProductsStatic = getAllProductsStatic;
const getAllProducts = async (req, res) => {
    const product = await product_1.products
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
    //console.log(queryObject)
    let result = product_1.products.find(queryObject);
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
