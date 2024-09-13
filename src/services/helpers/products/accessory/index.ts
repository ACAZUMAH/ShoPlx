import accessories from "../../../../models/schemas/products/accessories";
import createError from 'http-errors';
import { Types } from 'mongoose'

/**
 * find accessory products by id
 * @param _id - accessory id
 * @returns accessory
 * @throws error when accessory not found
 */
export const findAccessoryProductById = async (_id: string | Types.ObjectId) => {
    const product = await accessories.findById(_id)
    if(!product)
        throw new createError.BadRequest('accessory not found')

    return product
}