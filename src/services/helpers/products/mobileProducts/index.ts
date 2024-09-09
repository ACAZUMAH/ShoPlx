import { Request } from "express";
import createError from "http-errors";
import mobilePhone from "../../../../models/schemas/products/mobile";
import { findCategoryByIdAndUpdate } from "../category";
import { findBrandByIdAndUpdate } from "../brands";

/**
 * save mobile phone product to the database
 * @param req - Request
 * @returns true
 */
export const createMbileProuct = async (req: Request) =>{
    const {
        category_id,
        location,
        pictures,
        brand_id,
        model,
        condition,
        secondCondition,
        color,
        exchange,
        description,
        price,
        phone
    } = req.body
    const product = await mobilePhone.create({
        category_id,
        location,
        pictures_ref: pictures,
        brand_id,
        model,
        condition,
        secondCondition,
        color,
        exchange,
        description,
        price,
        phone   
    })
    if(!product) 
        throw new createError.InternalServerError('unable to create product')
    await findBrandByIdAndUpdate(brand_id, product._id)
    await findCategoryByIdAndUpdate(category_id, product._id)
    return true
}