"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnName = exports.findCategoryByIdAndUpdate = exports.findcategory = void 0;
const category_1 = __importDefault(require("../../../../models/schemas/category"));
const http_errors_1 = __importDefault(require("http-errors"));
const catalog_1 = require("../catalog");
/**
 * retrieve categories from the database of a particular catalog
 * @param _id - id of the catalog the category belongs to
 * @returns all the categories in the catalog
 */
const findcategory = async (_id) => {
    const catalogy = await (0, catalog_1.getCatelogById)(_id);
    const categories = [];
    for (const categoryId of catalogy.sub_categories) {
        const categoryData = await category_1.default.findById(categoryId, { parent_catalog: 0, brands: 0, products_Ids: 0, types: 0 });
        if (categoryData)
            categories.push(categoryData);
    }
    return categories;
};
exports.findcategory = findcategory;
/**
 * find category by id and push product id to the products_Ids array
 * @param _id - category id
 * @param product_id - product id
 * @returns true
 * @throws error when category not found
 */
const findCategoryByIdAndUpdate = async (_id, product_id) => {
    if (!await category_1.default.exists({ _id }))
        throw new http_errors_1.default.BadRequest('category not found');
    if (product_id) {
        await category_1.default.findByIdAndUpdate(_id, { $push: { products_Ids: product_id } });
    }
    return true;
};
exports.findCategoryByIdAndUpdate = findCategoryByIdAndUpdate;
const returnName = async (categories) => {
    const catName = [];
    for (const category of categories) {
        catName.push(category.name);
    }
    return catName;
};
exports.returnName = returnName;
