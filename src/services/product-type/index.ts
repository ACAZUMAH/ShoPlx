import types from "../../../../models/schemas/type";
import createHttpError from "http-errors";
import { Types } from 'mongoose';
import { getCategoryById } from "../category";


/**
 * find types that belong to a particular category
 * @param _id - category id
 * @returns types
 */
export const findCategoryType = async (_id: string) => {
    const category: any = await getCategoryById(_id)
    const type: any = []
    for(const brandId of category.types){
        const brandData = await types.findById(brandId)
        if(brandData) type.push(brandData)
    }
    return type
}

/**
 * find type by id and push product id to the products_Ids array
 * @param _id - type id
 * @param product_id - product id
 * @returns true
 * @throws error when type not found
 */
export const findTypeByIdAndUpdate = async (_id: string, product_id?: Types.ObjectId) => {
    if(!(await types.exists({ _id })))
        throw new createHttpError.BadRequest('type not found')
    if(product_id){
        await types.findByIdAndUpdate(_id, {
            $push: { products_Ids: product_id }
        })
    }
    return true
}