import { NextFunction, Request, Response } from "express";
import { products } from '../models/schemas/product';
import { getAllCatalogs } from '../services/helpers/products/catalog';
import { findcategory,returnName } from "../services/helpers/products/category";
type queryType = {
    featured?: boolean,
    company?: string,
    name?: object
}

export const getcatelogs = async (req: Request, res: Response) =>{
    const catalogs: any = await getAllCatalogs()
    return res.status(200).json({ success: true, data: await returnName(catalogs) })
}

export const getCategories = async (req: Request, res: Response) =>{
    const { catalog } = req.query
    const categories = await findcategory(catalog as string)
    return res.status(200).json({ success: true, data: await returnName(categories) })
}

export const postProducts = async (req:Request, res:Response) =>{
}
export const getAllProductsStatic = async (req: Request, res: Response, next: NextFunction) => {
    const product = await products.find({}).sort('created_At').limit(40)
    res.status(200).json({ sucess: true, data: product, nbHits: product.length})
}

export const getAllProducts = async (req: Request, res: Response) => {
    const product = await products
    .find({price: { $gt: 30}})
    .sort('name')
    .select('name price rating company')
    res.status(200).json({ sucess: true, data: product, nbHits: product.length})
}

export const searchProducts = async (req: Request, res: Response) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject: queryType = {}
    if(name){
        queryObject.name = { $regex: name as string, $options: 'i'}
    }
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company as string
    }
    if(numericFilters){
        const operatorMap ={
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        const filters = (numericFilters as string).replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters.split( ',' )
        .forEach((item) =>{
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }
    //console.log(queryObject)
    let result = products.find(queryObject)
    if(sort){
       const sortList = (sort as string).split(',').join(' ')
       result = result.sort(sortList)
    }else{
        result = result.sort('created_At')
    }
    if(fields){
        const fieldsList = (fields as string).split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    const product = await result
    res.status(200).json({ success: true, data: product, nbHits: product.length})
}