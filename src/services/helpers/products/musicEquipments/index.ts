import musicEquip from '../../../../models/schemas/products/musicEquip'
import createError from 'http-errors';

/**
 * find audio and music equipment products by id
 * @param _id - music equipment id
 * @returns music equipment
 * @throws error when music equipment not found
 */
export const findMusicEquipProductById = async (_id: string) => {
    if(!await musicEquip.exists({ _id }))
        throw new createError.BadRequest('music equipment not found')

    return musicEquip.findById(_id)
}