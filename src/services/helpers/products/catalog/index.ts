import catalog from "../../../../models/schemas/catalog";
import { Types } from "mongoose";
import createError from "http-errors";
import { findcategory, getCategoryById } from "../category";
import { findHeadphoneProductById } from "../headphones";
import { findLaptopProductById } from "../laptops";
import { findMusicEquipProductById } from "../musicEquipments";
import { findPrinterScannerProductById } from "../printers-scanners";
import { findMobileProductById } from "../mobileProducts";
import { findSmartWatchProductById } from "../smart-watches";
import { findTabletProductById } from "../tablets";
import { findAccessoryProductById } from "../accessory";
import category from "@/models/schemas/category";

/**
 * get all catalogs from the database
 * @returns all catalogs
 */
export const getAllCatalogs = async () => {
  return await catalog.find({
    $or: [
      { name: "Electronics" },
      { name: "Phones & Tablets" },
      { name: "Home,Appliances & furniture" },
    ],
  });
};

/**
 * gets catalog from the databse with a matching id
 * @param id - catalogId
 * @returns matching catalog
 * @throws Error when id does not exist
 */
export const getCatelogById = async (id: string | Types.ObjectId) => {
  const cat = await catalog.findById(id);
  if (!cat) throw new createError.BadRequest("No catalog with this Id");
  return cat;
};

/**
 * get a catalog by it's name
 * @param name - name of the catalog
 * @returns matching catalog
 * @throws Error when no catalog with such name exist
 */
export const getCatelogByName = async (name: string) => {
  if (!(await catalog.findOne({ name }))) {
    throw new createError.BadRequest("category not found");
  }
  return catalog.findOne({ name });
};

/**
 * finds all the products in a particular catalog
 * @param id - catalog id
 * @returns products in the catalog
 * @throws Error when no catalog with such id exist
 */
export const findCatelogProducts = async (id: string | Types.ObjectId) => {
  const catalog: any = await getCatelogById(id);
  const productList: any = [];
  for (const category of catalog.sub_categories) {
    const categoryData: any = await getCategoryById(category);
    if (categoryData.name === "computers & laptops") {
      for (const productId of categoryData.products_Ids) {
        const products = await findLaptopProductById(productId);
        if (products) productList.push(products);
      }
    } else if (categoryData.name === "Printers & Scanners") {
      for (const productId of categoryData.products_Ids) {
        const products = await findPrinterScannerProductById(productId);
        if (products) productList.push(products);
      }
    } else if (categoryData.name === "Audio & Music Equipments") {
      for (const productId of categoryData.products_Ids) {
        const products = await findMusicEquipProductById(productId);
        if (products) productList.push(products);
      }
    } else if (categoryData.name === "Headphones") {
      for (const productId of categoryData.products_Ids) {
        const products = await findHeadphoneProductById(productId);
        if (products) productList.push(products);
      }
    } else if (categoryData.name === "mobile phones") {
      for (const productId of categoryData.products_Ids) {
        const products = await findMobileProductById(productId);
        if (products) productList.push(products);
      }
    } else if (categoryData.name === "tablets") {
      for (const productId of categoryData.products_Ids) {
        const products = await findTabletProductById(productId);
      }
    } else if (categoryData.name === 'smart watches'){
      for (const productId of categoryData.products_Ids) {
        const products = await findSmartWatchProductById(productId);
      }
    } else if (categoryData.name === 'accessories') {
      for (const productId of categoryData.products_Ids) {
        const products = await findAccessoryProductById(productId);
      }
    }
  }
  return productList;
};
