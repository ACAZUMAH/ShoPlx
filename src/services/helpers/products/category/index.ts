import category from "../../../../models/schemas/category";
import createError from "http-errors";
import { Types } from "mongoose";
import { getCatelogById } from "../catalog";

/**
 * retrieve categories from the database of a particular catalog
 * @param _id - id of the catalog the category belongs to
 * @returns all the categories in the catalog
 */
export const findcategory = async (_id: string) =>{
    const catalogy = await getCatelogById(_id)
    const categories:any = []
    for(const categoryId of catalogy.sub_categories){
        const categoryData = await category.findById(categoryId, { parent_catalog: 0, brands: 0, products_Ids: 0 })
        if (categoryData) categories.push(categoryData);
    }
    return categories
}

/**
 * find category by id and push product id to the products_Ids array
 * @param _id - category id
 * @param product_id - product id
 * @returns true
 * @throws error when category not found
 */
export const findCategoryByIdAndUpdate = async (_id: string, product_id?: Types.ObjectId) => {
    if(!await category.exists({ _id }))
        throw new createError.BadRequest('category not found')
    if(product_id){
        await category.findByIdAndUpdate(_id, { $push: { products_Ids: product_id } })
    }
    return true
}
export const returnName = async (categories: Array<any>) =>{
    const catName: any = []
    for( const category of categories){
        catName.push(category.name)
    }
    return catName
}
