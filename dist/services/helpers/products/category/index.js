"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnName = exports.findProductsOfcategory = exports.findCategoryByIdAndUpdate = exports.findcategory = exports.getCategoryById = void 0;
const category_1 = __importDefault(require("../../../../models/schemas/category"));
const http_errors_1 = __importDefault(require("http-errors"));
const catalog_1 = require("../catalog");
const laptops_1 = require("../laptops");
const printers_scanners_1 = require("../printers-scanners");
const musicEquipments_1 = require("../musicEquipments");
const headphones_1 = require("../headphones");
const getCategoryById = async (_id) => {
    const cat = await category_1.default.findById(_id);
    if (!cat)
        throw new http_errors_1.default.BadRequest("category not found");
    return cat;
};
exports.getCategoryById = getCategoryById;
/**
 * retrieve categories from the database of a particular catalog
 * @param _id - id of the catalog the category belongs to
 * @returns all the categories in the catalog
 */
const findcategory = async (_id) => {
    const catalogy = await (0, catalog_1.getCatelogById)(_id);
    const categories = [];
    for (const categoryId of catalogy.sub_categories) {
        const categoryData = await category_1.default.findById(categoryId);
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
    if (!(await category_1.default.exists({ _id })))
        throw new http_errors_1.default.BadRequest("category not found");
    if (product_id) {
        await category_1.default.findByIdAndUpdate(_id, {
            $push: { products_Ids: product_id },
        });
    }
    return true;
};
exports.findCategoryByIdAndUpdate = findCategoryByIdAndUpdate;
/**
 * find category by id and use the products_Ids array to find products
 * @param _id - category id
 * @param product_id - product id
 * @returns true
 * @throws error when category not found
 */
const findProductsOfcategory = async (_id) => {
    const cat = await (0, exports.getCategoryById)(_id);
    const productList = [];
    if (cat.name === 'computers & laptops') {
        for (const productId of cat.products_Ids) {
            const products = await (0, laptops_1.findLaptopProductById)(productId);
            if (products)
                productList.push(products);
        }
    }
    else if (cat.name === 'Printers & Scanners') {
        for (const productId of cat.products_Ids) {
            const products = await (0, printers_scanners_1.findPrinterScannerProductById)(productId);
            if (products)
                productList.push(products);
        }
    }
    else if (cat.name === 'Audio & Music Equipments') {
        for (const productId of cat.products_Ids) {
            const products = await (0, musicEquipments_1.findMusicEquipProductById)(productId);
            if (products)
                productList.push(products);
        }
    }
    else if (cat.name === 'Headphones') {
        for (const productId of cat.products_Ids) {
            const products = await (0, headphones_1.findHeadphoneProductById)(productId);
            if (products)
                productList.push(products);
        }
    }
    return productList;
};
exports.findProductsOfcategory = findProductsOfcategory;
const returnName = async (categories) => {
    const catName = [];
    for (const category of categories) {
        catName.push(category.name);
    }
    return catName;
};
exports.returnName = returnName;
