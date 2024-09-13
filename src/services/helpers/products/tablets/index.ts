import tablets from "../../../../models/schemas/products/tablets";
import createError from 'http-errors';
import { Types } from 'mongoose'

/**
 * find tablet products by id
 * @param _id - tablet id
 * @returns tablet
 * @throws error when tablet not found
 */
export const findTabletProductById = async (_id: string | Types.ObjectId) => {
    const product = await tablets.findById(_id)
    if(!product)
        throw new createError.BadRequest('products not found')

    return product
}