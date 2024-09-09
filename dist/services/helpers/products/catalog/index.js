"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatelogByName = exports.getCatelogById = exports.getAllCatalogs = void 0;
const catalog_1 = __importDefault(require("../../../../models/schemas/catalog"));
const http_errors_1 = __importDefault(require("http-errors"));
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
