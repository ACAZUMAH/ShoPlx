"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnName = exports.findcategory = void 0;
const category_1 = __importDefault(require("../../../../models/schemas/category"));
const catalog_1 = require("../catalog");
const findcategory = async (catalog) => {
    const sub = await (0, catalog_1.getCatelogByName)(catalog);
    const categories = [];
    for (const categoryId of sub.sub_categories) {
        const categoryData = await category_1.default.findById(categoryId);
        if (categoryData) {
            categories.push(categoryData);
        }
    }
    return categories;
};
exports.findcategory = findcategory;
const returnName = async (categories) => {
    const catName = [];
    for (const category of categories) {
        catName.push(category.name);
    }
    return catName;
};
exports.returnName = returnName;
