"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatelogById = exports.getAllCatalogs = void 0;
const catalog_1 = __importDefault(require("../../../models/schemas/catalog"));
const getAllCatalogs = async () => {
    return await catalog_1.default.find({ $or: [{ name: 'Electronics' }, { name: 'Phones & Tablets' }, { name: 'Home,Appliances & furniture' }] });
};
exports.getAllCatalogs = getAllCatalogs;
const getCatelogById = async (id) => {
    return await catalog_1.default.findById(id);
};
exports.getCatelogById = getCatelogById;
// async function test(){
//     console.log(await getCatelogById('669fc4e09d31f5e872622c24'))
// }
// test()
