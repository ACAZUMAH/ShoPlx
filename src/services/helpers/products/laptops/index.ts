import laptop from '../../../../models/schemas/products/laptops';
import createError from 'http-errors';
import { Types } from 'mongoose';

/**
 * find laptop products by id
 * @param _id - laptop id
 * @returns laptop
 * @throws error when laptop not found
 */
export const findLaptopProductById = async (_id: string | Types.ObjectId) => {
    const product = await laptop.findById(_id)
    if(!product)
        throw new createError.BadRequest('products not found')

    return product
}