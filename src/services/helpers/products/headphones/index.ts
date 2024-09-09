import headphones from "../../../../models/schemas/products/headphones";
import createError from 'http-errors';

/**
 * find headphone products by id
 * @param _id - headphone id
 * @returns headphone
 * @throws error when headphone not found
 */
export const findHeadphoneProductById = async (_id: string) => {
    if(!await headphones.exists({ _id }))
        throw new createError.BadRequest('headphone not found')

    return headphones.findById(_id)
}