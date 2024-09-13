"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsOfcategory = exports.getProductsOfCatalog = exports.postProducts = exports.getTypes = exports.getBrands = exports.getCategories = exports.getcatelogs = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
//import { products } from '../models/schemas/product';
const catalog_1 = require("../services/helpers/products/catalog");
const category_1 = require("../services/helpers/products/category");
const mobileProducts_1 = require("../services/helpers/products/mobileProducts");
const brands_1 = require("../services/helpers/products/brands");
const types_1 = require("../services/helpers/products/types");
/**
 * control for getting all the catalogs
 * @param req - Request
 * @param res - Response
 * @returns all catalogs
 */
const getcatelogs = async (_req, _res) => {
    const catalogs = await (0, catalog_1.getAllCatalogs)();
    return _res.status(200).json({ success: true, data: catalogs });
};
exports.getcatelogs = getcatelogs;
/**
 * control for getting all categories in a catalog using the catalog id
 * @param req - Request
 * @param res - Response
 * @returns all categories
 */
const getCategories = async (_req, _res) => {
    const { _id } = _req.query;
    const categories = await (0, category_1.findcategory)(_id);
    return _res.status(200).json({ success: true, data: categories });
};
exports.getCategories = getCategories;
/**
 * control for getting all brands of a category using the category id
 * @param req - Request
 * @param res - Response
 * @returns all brands
 */
const getBrands = async (_req, _res) => {
    const { _id } = _req.query;
    const brands = await (0, brands_1.findCategoryBrand)(_id);
    return _res.status(200).json({ success: true, data: brands });
};
exports.getBrands = getBrands;
/**
 * control for getting all types of a category using the category id
 * @param _req - Request
 * @param _res - Response
 * @returns all types
 */
const getTypes = async (_req, _res) => {
    const { _id } = _req.query;
    const types = await (0, types_1.findCategoryType)(_id);
    return _res.status(200).json({ success: true, data: types });
};
exports.getTypes = getTypes;
/**
 * a control for posting  products to the database
 * @param req - Request
 * @param res - Response
 * @return success message
 * @throws error if input is invalid
 */
const postProducts = async (_req, _res) => {
    const errors = (0, express_validator_1.validationResult)(_req);
    if (!errors.isEmpty())
        throw new http_errors_1.default.BadRequest(errors.array()[0].msg);
    if (await (0, mobileProducts_1.createMobileProuct)(_req))
        return _res.status(200).json({ success: true });
};
exports.postProducts = postProducts;
/**
 * control for getting all products in a category using the category id
 * @param req - Request
 * @param res - Response
 * @returns all products in each catalog
 */
const getProductsOfCatalog = async (_req, _res) => {
    const { _id } = _req.query;
    const products = await (0, catalog_1.findCatelogProducts)(_id);
    return _res.status(200).json({ success: true, data: products });
};
exports.getProductsOfCatalog = getProductsOfCatalog;
/**
 * control for getting all products in a category using the category id
 * @param req - Request
 * @param res - Response
 * @returns all products in each category
 */
const getProductsOfcategory = async (_req, _res) => {
    const { _id } = _req.query;
    const products = await (0, category_1.findProductsOfcategory)(_id);
    return _res.status(200).json({ success: true, data: products });
};
exports.getProductsOfcategory = getProductsOfcategory;
// export const getAllProductsStatic = async (req: Request, res: Response) => {
//     const product = await products.find({}).sort('created_At').limit(40)
//     res.status(200).json({ sucess: true, data: product, nbHits: product.length})
// }
// export const getAllProducts = async (req: Request, res: Response) => {
//     const product = await products
//     .find({price: { $gt: 30}})
//     .sort('name')
//     .select('name price rating company')
//     res.status(200).json({ sucess: true, data: product, nbHits: product.length})
// }
// export const searchProducts = async (req: Request, res: Response) => {
//     const { featured, company, name, sort, fields, numericFilters } = req.query
//     const queryObject: queryType = {}
//     if(name){
//         queryObject.name = { $regex: name as string, $options: 'i'}
//     }
//     if(featured){
//         queryObject.featured = featured === 'true' ? true : false
//     }
//     if(company){
//         queryObject.company = company as string
//     }
//     if(numericFilters){
//         const operatorMap ={
//             '>': '$gt',
//             '>=': '$gte',
//             '=': '$eq',
//             '<': '$lt',
//             '<=': '$lte'
//         }
//         const regEx = /\b(<|>|>=|=|<|<=)\b/g
//         const filters = (numericFilters as string).replace(regEx, (match) => `-${operatorMap[match]}-`)
//         const options = ['price', 'rating']
//         filters.split( ',' )
//         .forEach((item) =>{
//             const [field, operator, value] = item.split('-')
//             if(options.includes(field)){
//                 queryObject[field] = { [operator]: Number(value) }
//             }
//         })
//     }
//     let result = products.find(queryObject)
//     if(sort){
//        const sortList = (sort as string).split(',').join(' ')
//        result = result.sort(sortList)
//     }else{
//         result = result.sort('created_At')
//     }
//     if(fields){
//         const fieldsList = (fields as string).split(',').join(' ')
//         result = result.select(fieldsList)
//     }
//     const page = Number(req.query.page) || 1
//     const limit = Number(req.query.limit) || 20
//     const skip = (page - 1) * limit
//     result = result.skip(skip).limit(limit)
//     const product = await result
//     res.status(200).json({ success: true, data: product, nbHits: product.length})
// }
