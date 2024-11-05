"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCatelogProducts = exports.getCatelogByName = exports.getCatelogById = exports.getAllCatalogs = void 0;
const catalog_1 = __importDefault(require("../../../../models/schemas/catalog"));
const http_errors_1 = __importDefault(require("http-errors"));
const category_1 = require("../category");
const headphones_1 = require("../headphones");
const laptops_1 = require("../laptops");
const musicEquipments_1 = require("../musicEquipments");
const printers_scanners_1 = require("../printers-scanners");
const mobile_1 = require("../mobile");
const smart_watches_1 = require("../smart-watches");
const tablets_1 = require("../tablets");
const accessory_1 = require("../accessory");
/**
 * get all catalogs from the database
 * @returns all catalogs
 */
const getAllCatalogs = async () => {
    return await catalog_1.default.find({
        $or: [
            { name: "Electronics" },
            { name: "Phones & Tablets" },
            { name: "Home,Appliances & furniture" },
        ],
    });
};
exports.getAllCatalogs = getAllCatalogs;
/**
 * gets catalog from the databse with a matching id
 * @param id - catalogId
 * @returns matching catalog
 * @throws Error when id does not exist
 */
const getCatelogById = async (id) => {
    const cat = await catalog_1.default.findById(id);
    if (!cat)
        throw new http_errors_1.default.BadRequest("No catalog with this Id");
    return cat;
};
exports.getCatelogById = getCatelogById;
/**
 * get a catalog by it's name
 * @param name - name of the catalog
 * @returns matching catalog
 * @throws Error when no catalog with such name exist
 */
const getCatelogByName = async (name) => {
    if (!(await catalog_1.default.findOne({ name }))) {
        throw new http_errors_1.default.BadRequest("category not found");
    }
    return catalog_1.default.findOne({ name });
};
exports.getCatelogByName = getCatelogByName;
/**
 * finds all the products in a particular catalog
 * @param id - catalog id
 * @returns products in the catalog
 * @throws Error when no catalog with such id exist
 */
const findCatelogProducts = async (id) => {
    const catalog = await (0, exports.getCatelogById)(id);
    const productList = [];
    for (const category of catalog.sub_categories) {
        const categoryData = await (0, category_1.getCategoryById)(category);
        if (categoryData.name === "computers & laptops") {
            for (const productId of categoryData.products_Ids) {
                const products = await (0, laptops_1.findLaptopProductById)(productId);
                if (products)
                    productList.push(products);
            }
        }
        else if (categoryData.name === "Printers & Scanners") {
            for (const productId of categoryData.products_Ids) {
                const products = await (0, printers_scanners_1.findPrinterScannerProductById)(productId);
                if (products)
                    productList.push(products);
            }
        }
        else if (categoryData.name === "Audio & Music Equipments") {
            for (const productId of categoryData.products_Ids) {
                const products = await (0, musicEquipments_1.findMusicEquipProductById)(productId);
                if (products)
                    productList.push(products);
            }
        }
        else if (categoryData.name === "Headphones") {
            for (const productId of categoryData.products_Ids) {
                const products = await (0, headphones_1.findHeadphoneProductById)(productId);
                if (products)
                    productList.push(products);
            }
        }
        else if (categoryData.name === "mobile phones") {
            for (const productId of categoryData.products_Ids) {
                const products = await (0, mobile_1.findMobileProductById)(productId);
                if (products)
                    productList.push(products);
            }
        }
        else if (categoryData.name === "tablets") {
            for (const productId of categoryData.products_Ids) {
                const products = await (0, tablets_1.findTabletProductById)(productId);
            }
        }
        else if (categoryData.name === 'smart watches') {
            for (const productId of categoryData.products_Ids) {
                const products = await (0, smart_watches_1.findSmartWatchProductById)(productId);
            }
        }
        else if (categoryData.name === 'accessories') {
            for (const productId of categoryData.products_Ids) {
                const products = await (0, accessory_1.findAccessoryProductById)(productId);
            }
        }
    }
    return productList;
};
exports.findCatelogProducts = findCatelogProducts;
