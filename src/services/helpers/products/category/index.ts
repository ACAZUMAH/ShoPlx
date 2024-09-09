import category from "../../../../models/schemas/category";
import createError from "http-errors";
import { Types } from "mongoose";
import { getCatelogById } from "../catalog";
import { findLaptopProductById } from "../laptops";
import { findPrinterScannerProductById } from "../printers-scanners";
import { findMusicEquipProductById } from "../musicEquipments";
import { findHeadphoneProductById } from "../headphones";

export const getCategoryById = async (_id: string | Types.ObjectId) => {
  if (!(await category.exists({ _id })))
    throw new createError.BadRequest("category not found");
  return category.findById(_id);
};

/**
 * retrieve categories from the database of a particular catalog
 * @param _id - id of the catalog the category belongs to
 * @returns all the categories in the catalog
 */
export const findcategory = async (_id: string) => {
  const catalogy = await getCatelogById(_id);
  const categories: any = [];
  for (const categoryId of catalogy.sub_categories) {
    const categoryData = await category.findById(
      categoryId /*{
      parent_catalog: 0,
      brands: 0,
      products_Ids: 0,
      types: 0,
    }*/
    );
    if (categoryData) categories.push(categoryData);
  }
  return categories;
};

/**
 * find category by id and push product id to the products_Ids array
 * @param _id - category id
 * @param product_id - product id
 * @returns true
 * @throws error when category not found
 */
export const findCategoryByIdAndUpdate = async (
  _id: string,
  product_id?: Types.ObjectId
) => {
  if (!(await category.exists({ _id })))
    throw new createError.BadRequest("category not found");
  if (product_id) {
    await category.findByIdAndUpdate(_id, {
      $push: { products_Ids: product_id },
    });
  }
  return true;
};

/**
 * find category by id and use the products_Ids array to find products
 * @param _id - category id
 * @param product_id - product id
 * @returns true
 * @throws error when category not found
 */
export const findProductsOfcategory = async (_id: string) => {
  const cat: any = await getCategoryById(_id);
  const productList: any = [];
  if(cat.name === 'computers & laptops'){
    for (const productId of cat.products_Ids) {
      const products = await findLaptopProductById(productId)
      if (products) productList.push(products);
    }
  }else if(cat.name === 'Printers & Scanners'){
    for (const productId of cat.products_Ids) {
      const products = await findPrinterScannerProductById(productId)
      if (products) productList.push(products);
    }
  }else if(cat.name === 'Audio & Music Equipments'){
    for (const productId of cat.products_Ids) {
      const products = await findMusicEquipProductById(productId)
      if (products) productList.push(products);
    }
  }else if(cat.name === 'Headphones'){
    for (const productId of cat.products_Ids) {
      const products = await findHeadphoneProductById(productId)
      if (products) productList.push(products);
    }
  }
  return productList;
};


export const returnName = async (categories: Array<any>) => {
  const catName: any = [];
  for (const category of categories) {
    catName.push(category.name);
  }
  return catName;
};
