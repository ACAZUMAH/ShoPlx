import headphones from "../../../../models/schemas/products/headphones";
import createError from 'http-errors';
import { Types } from 'mongoose'

/**
 * find headphone products by id
 * @param _id - headphone id
 * @returns headphone
 * @throws error when headphone not found
 */
export const findHeadphoneProductById = async (_id: string | Types.ObjectId) => {
    const product = await headphones.findById(_id)
    if(!product)
        throw new createError.BadRequest('products not found')

    return product
}