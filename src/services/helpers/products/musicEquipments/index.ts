import musicEquip from '../../../../models/schemas/products/musicEquip'
import createError from 'http-errors';
import { Types } from 'mongoose'

/**
 * find audio and music equipment products by id
 * @param _id - music equipment id
 * @returns music equipment
 * @throws error when music equipment not found
 */
export const findMusicEquipProductById = async (_id: string | Types.ObjectId) => {
    const product = await musicEquip.findById(_id)
    if(!product)
        throw new createError.BadRequest('products not found')

    return product
}