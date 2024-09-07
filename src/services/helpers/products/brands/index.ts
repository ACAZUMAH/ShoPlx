import brand from "../../../../models/schemas/brand";
import createError from "http-errors";
import { Types } from "mongoose";


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