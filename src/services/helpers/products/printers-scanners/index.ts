import printerScanner from "../../../../models/schemas/products/printers";
import createError from 'http-errors';
import { Types } from 'mongoose'
/**
 * find printer and scanner products by id
 * @param _id - printer scanner id
 * @returns printer scanner
 * @throws error when printer scanner not found
 */
export const findPrinterScannerProductById = async (_id: string | Types.ObjectId) => {
    const product = await  printerScanner.findById(_id)
    if(!product)
        throw new createError.BadRequest('products not found')

    return product 
}