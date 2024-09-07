import { Request, Response } from "express";
import { validationResult } from "express-validator";
import createError from 'http-errors';
//import { products } from '../models/schemas/product';
import { getAllCatalogs, getCatelogById } from '../services/helpers/products/catalog';
import { findcategory } from "../services/helpers/products/category";
import { createMbileProuct } from "../services/helpers/products/mobileProducts";
type queryType = {
    featured?: boolean,
    company?: string,
    name?: object
}


/**
 * getting all the catalogs
 * @param req - Request 
 * @param res - Response
 * @returns all catalogs
 */
export const getcatelogs = async (req: Request, res: Response) =>{
    const catalogs: any = await getAllCatalogs()
    return res.status(200).json({ success: true, data: catalogs })
}


/**
 * getting all categories
 * @param req - Request
 * @param res - Response
 * @returns all categories
 */
export const getCategories = async (req: Request, res: Response) =>{
    const { _id } = req.query
    //const catalogy = await getCatelogById(_id as string)
    const categories = await findcategory(_id as string)
    return res.status(200).json({ success: true, data: categories })
}

/**
 * post products to the database
 * @param req - Request 
 * @param res - Response
 * @return success message
 * @throws error if input is invalid
 */
export const postProducts = async (req:Request, res:Response) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
        throw new createError.BadRequest(errors.array()[0].msg)
    if(await createMbileProuct(req))
        return res.status(200).json({ success: true })
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