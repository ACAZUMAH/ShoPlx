import brand from "../../../../models/schemas/brand";
import createError from "http-errors";
import { Types } from "mongoose";
import { getCategoryById } from "../category";


/**
 * find brand by id and push product id to the products_Ids array
 * @param _id - brand id
 * @param product_id - product id
 * @returns - true
 * @throws - error when brand not found
 */
export const findBrandByIdAndUpdate = async (_id: string, product_id: string | Types.ObjectId) => {
    if(!await brand.exists({ _id }))
        throw new createError.BadRequest('brand not found')
    await brand.findByIdAndUpdate(_id, { $push: { products_Ids: product_id } })
    return true
}

/**
 * find brands that belong to a particular category
 * @param _id - category id
 * @returns brands
 * @throws error when category not found
 */
export const findCategoryBrand = async (_id: string) => {
    const category: any = await getCategoryById(_id)
    const brands: any = []
    for(const brandId of category.brands){
        const brandData = await brand.findById(brandId)
        if(brandData) brands.push(brandData)
    }
    return brands
}