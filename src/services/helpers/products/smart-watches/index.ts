import smartWatch from "../../../../models/schemas/products/smartWatch";
import createError from 'http-errors';
import { Types } from "mongoose";


/**
 * find smart watch products by id
 * @param _id - smart watch id
 * @returns smart watch
 * @throws error when smart watch not found
 */
export const findSmartWatchProductById = async (_id: string | Types.ObjectId) => {
    const product = await smartWatch.findById(_id)
    if(!product)
        throw new createError.BadRequest('products not found')

    return product
}