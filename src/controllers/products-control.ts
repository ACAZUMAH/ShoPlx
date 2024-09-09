import { Request, Response } from "express";
import { validationResult } from "express-validator";
import createError from 'http-errors';
//import { products } from '../models/schemas/product';
import { getAllCatalogs  } from '../services/helpers/products/catalog';
import { findcategory, findProductsOfcategory } from "../services/helpers/products/category";
import { createMbileProuct } from "../services/helpers/products/mobileProducts";
import { findCategoryBrand } from "../services/helpers/products/brands";
import { findCategoryType } from "../services/helpers/products/types";
type queryType = {
    featured?: boolean,
    company?: string,
    name?: object
}

/**
 * control for getting all the catalogs
 * @param req - Request 
 * @param res - Response
 * @returns all catalogs
 */
export const getcatelogs = async (_req: Request, _res: Response) =>{
    const catalogs: any = await getAllCatalogs()
    return _res.status(200).json({ success: true, data: catalogs })
}

/**
 * control for getting all categories in a catalog using the catalog id
 * @param req - Request
 * @param res - Response
 * @returns all categories
 */
export const getCategories = async (_req: Request, _res: Response) =>{
    const { _id } = _req.query
    const categories = await findcategory(_id as string)
    return _res.status(200).json({ success: true, data: categories })
}

/**
 * control for getting all brands of a category using the category id
 * @param req - Request
 * @param res - Response
 * @returns all brands
 */
export const getBrands = async (_req: Request, _res: Response) =>{
    const { _id } = _req.query
    const brands = await findCategoryBrand(_id as string)
    return _res.status(200).json({ success: true, data: brands })
}
/**
 * control for getting all types of a category using the category id
 * @param _req - Request
 * @param _res - Response
 * @returns all types
 */
export const getTypes = async (_req: Request, _res: Response) =>{
    const { _id } = _req.query
    const types = await findCategoryType(_id as string)
    return _res.status(200).json({ success: true, data: types })
}
/**
 * a control for posting  products to the database
 * @param req - Request 
 * @param res - Response
 * @return success message
 * @throws error if input is invalid
 */
export const postProducts = async (_req:Request, _res:Response) =>{
    const errors = validationResult(_req)
    if(!errors.isEmpty())
        throw new createError.BadRequest(errors.array()[0].msg)
    if(await createMbileProuct(_req))
        return _res.status(200).json({ success: true })
}

export const getProductsOfcategory = async (_req: Request, _res: Response) =>{
    const { _id } = _req.query
    const products = await findProductsOfcategory(_id as string)
    return _res.status(200).json({ success: true, data: products })
}





// export const getAllProductsStatic = async (req: Request, res: Response) => {
//     const product = await products.find({}).sort('created_At').limit(40)
//     res.status(200).json({ sucess: true, data: product, nbHits: product.length})
// }

// export const getAllProducts = async (req: Request, res: Response) => {
//     const product = await products
//     .find({price: { $gt: 30}})
//     .sort('name')
//     .select('name price rating company')
//     res.status(200).json({ sucess: true, data: product, nbHits: product.length})
// }

// export const searchProducts = async (req: Request, res: Response) => {
//     const { featured, company, name, sort, fields, numericFilters } = req.query
//     const queryObject: queryType = {}
//     if(name){
//         queryObject.name = { $regex: name as string, $options: 'i'}
//     }
//     if(featured){
//         queryObject.featured = featured === 'true' ? true : false
//     }
//     if(company){
//         queryObject.company = company as string
//     }
//     if(numericFilters){
//         const operatorMap ={
//             '>': '$gt',
//             '>=': '$gte',
//             '=': '$eq',
//             '<': '$lt',
//             '<=': '$lte'
//         }
//         const regEx = /\b(<|>|>=|=|<|<=)\b/g
//         const filters = (numericFilters as string).replace(regEx, (match) => `-${operatorMap[match]}-`)
//         const options = ['price', 'rating']
//         filters.split( ',' )
//         .forEach((item) =>{
//             const [field, operator, value] = item.split('-')
//             if(options.includes(field)){
//                 queryObject[field] = { [operator]: Number(value) }
//             }
//         })
//     }
//     let result = products.find(queryObject)
//     if(sort){
//        const sortList = (sort as string).split(',').join(' ')
//        result = result.sort(sortList)
//     }else{
//         result = result.sort('created_At')
//     }
//     if(fields){
//         const fieldsList = (fields as string).split(',').join(' ')
//         result = result.select(fieldsList)
//     }
//     const page = Number(req.query.page) || 1
//     const limit = Number(req.query.limit) || 20
//     const skip = (page - 1) * limit
//     result = result.skip(skip).limit(limit)
//     const product = await result
//     res.status(200).json({ success: true, data: product, nbHits: product.length})
// }