import laptop from '../../../../models/schemas/products/laptops';
import createError from 'http-errors';

/**
 * find laptop products by id
 * @param _id - laptop id
 * @returns laptop
 * @throws error when laptop not found
 */
export const findLaptopProductById = async (_id: string) => {
    if(!await laptop.exists({ _id }))
        throw new createError.BadRequest('laptop not found')

    return laptop.findById(_id)
}