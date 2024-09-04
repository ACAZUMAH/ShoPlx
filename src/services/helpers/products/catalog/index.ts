import catalog from "../../../../models/schemas/catalog";
import createError from 'http-errors'


export const getAllCatalogs = async () => {
    return await catalog.find({ $or: [{ name: 'Electronics' },{ name: 'Phones & Tablets' }, { name: 'Home,Appliances & furniture' }] })
}

export const getCatelogById = async (id: string) => {
    return await catalog.findById(id)
}

export const getCatelogByName = async (name: string) => {
    if(!await catalog.findOne( { name } )){
        throw new createError.BadRequest('category not found')
    }
    return catalog.findOne({ name })
}